import io from 'socket.io-client';
import { useState, useEffect } from 'react';

function Test() {
  const socket = io();
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
      setLobbyData({ lobbyData: data.lobbyData });
      setPlayerData({ playerData: data.playerData });
    });
  }

  const handleJoinLobby = () => {
    socket.emit('joinLobby', { name: loginData.name, lobby: loginData.lobby});
    socket.on('success', (data) => {
      setLobbyData({ lobbyData: data.lobbyData });
      setPlayerData({ playerData: data.playerData });
    })
  }

  // useEffect(() => {
  //   console.log('hello');
  //   socket.on('sendLobbyData', (data) => {
  //     console.log(data);
  //     setLobbyData({ lobbyData: data.lobbyData });
  //   });
  //   socket.emit('getLobbyData', { lobby: loginData.lobby });
  // }, [socket]);

  return(
    <div>
      <form>
        <input type="text" placeholder="Enter your nickname" name="name" onChange={handleFormChange}/>
        <br/>
        <input type="text" placeholder="Enter lobby name" name="lobby" onChange={handleFormChange}/>
        <br/>
        <button type="button" onClick={handleLogin}>Create Lobby</button>
        <br/>
        <button type="button" onClick={handleJoinLobby}>Join Lobby</button>
      </form>
      <div>
        Current Players
        {/* {lobbyData && Object.keys(lobbyData.players).map((player) => (<div>{player}</div>))} */}
      </div>
    </div>
  )
}

export default Test;
