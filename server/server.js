require('dotenv').config();
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const next  = require('next');
const { lobbies, addLobby, getLobby, deleteLobby } = require('./lobby');
const { assignPlayerToLobby, removePlayerFromLobby } = require('./player');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev })
const handler = nextApp.getRequestHandler();
const port = process.env.PORT || 3000;

io.on('connect', socket => {
  socket.on('createLobby', async (data) => {
    let lobbyData = await addLobby(data.lobby);
    if (lobbyData.error) {
      lobbyData = await getLobby(data.lobby);
    }
    const playerData = await  assignPlayerToLobby(data.name, data.lobby);
    socket.emit('success', { playerData, lobbyData });
  });
  socket.on('joinLobby', async (data) => {
    let lobbyData = await getLobby(data.lobby);
    console.log(lobbyData);
    const playerData = await assignPlayerToLobby(data.name, data.lobby);
    socket.emit('success', { playerData, lobbyData });
  })
  socket.on('disconnect', ({ name, lobby }, callback) => {

  });

  socket.on('getLobbyData', async(data) => {
    console.log(data);
  });
});

nextApp.prepare()
  .then(() => {
    app.get('*', (req, res) => {
      return handler(req, res);
    })

    server.listen(port, (err) => {
      if (err) { throw err; }
      console.log(`listneing on port ${port}`);
    })
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  });
