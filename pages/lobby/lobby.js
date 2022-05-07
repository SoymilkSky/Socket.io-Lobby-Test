import { SocketContext } from '../api/socketContext';
import { useState, useEffect, useContext } from 'react';

function Lobby() {
  const socket = useContext(SocketContext);
  const [lobbyData, setLobbyData] = useState(null);
  const [playerData, setPlayerData] = useState(null);
  const [loginData, setLoginData] = useState({
    name: null,
    lobby: null,
  });

  const handleFormChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  }

  const handleLogin = () => {
    socket.emit('createLobby', { name: loginData.name, lobby: loginData.lobby });
    socket.on('success', (data) => {
      setLobbyData(data.lobbyData.lobby);
      setPlayerData(data.playerData.player);
    });
  }

  const handleJoinLobby = async () => {
    await socket.emit('joinLobby', { name: loginData.name, lobby: loginData.lobby});
    await socket.on('success', (data) => {
      setLobbyData(data.lobbyData.lobby);
      setPlayerData(data.playerData.player);
    });
  }

  useEffect(() => {
    socket.on('lobby', (data) => {
      setLobbyData(data.lobbyData);
    });
  }, [socket]);

  return(
    <div>
      {lobbyData ? console.log(lobbyData.players) : null}
      <form>
        <input type="text" placeholder="Enter your nickname" name="name" onChange={(e) => handleFormChange(e)}/>
        <br/>
        <input type="text" placeholder="Enter lobby name" name="lobby" onChange={(e) => handleFormChange(e)}/>
        <br/>
        <button type="button" onClick={handleLogin}>Create Lobby</button>
        <br/>
        <button type="button" onClick={handleJoinLobby}>Join Lobby</button>
      </form>
      <h1>Current Players</h1>
      {lobbyData ? Object.keys(lobbyData.players).map((player) => (<div key={player}>{lobbyData.players[player].name}</div>)) : null}
    </div>
  )
}

export default Lobby;
