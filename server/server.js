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

const emitLobbyData = async (lobby) => {
  const lobbyData = await getLobby(lobby);
  io.emit('lobby', { lobbyData });
}

io.on('connect', socket => {
  socket.on('createLobby', async ({ name, lobby}) => {
    let lobbyData = await addLobby(lobby);
    if (lobbyData.error) {
      lobbyData = await getLobby(lobby);
    }
    const playerData = await assignPlayerToLobby(name, lobby);
    socket.emit('success', { playerData, lobbyData });
  });
  socket.on('joinLobby', async ({ name, lobby }) => {
    let lobbyData = await getLobby(lobby);
    const playerData = await assignPlayerToLobby(name, lobby);
    socket.emit('success', { playerData, lobbyData });
    emitLobbyData(lobby);
  })
  socket.on('disconnect', ({ name, lobby }) => {
    console.log(name, lobby);
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
