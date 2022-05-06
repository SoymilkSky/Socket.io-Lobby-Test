const { lobbies, deleteLobby } = require('./lobby');

class Player {
  constructor(name, lobby) {
    this.name = name;
    this.lobby = lobby;
    this.spectator = false;
    this.role = null;
    this.questions = {};
    this.tokens = {
      yes: 0,
      no: 0,
      maybe: 0,
      'wayOff': 0,
      'soClose': 0,
      'correct': 0,
    };
  }
}

const assignPlayerToLobby = (name, lobby) => {
  console.log(lobbies);
  const currentLobby = lobbies.get(lobby);
  console.log(currentLobby);
  if (Object.keys(currentLobby.players).length === 10) {
    return { error: 'Lobby is full' };
  }

  const player = new Player(name, lobby);
  lobbies.get(lobby).players[name] = player;
  return { player };
}

const removePlayerFromLobby = (name, lobby) => {
  const currentLobby = lobby.get(lobby);
  if (currentLobby.players[name]) {
    currentLobby.players.delete(name);
    if (Object.keys(currentLobby.players).length === 0) {
      deleteLobby(lobby);
    }
  }
}

module.exports = {
  assignPlayerToLobby,
  removePlayerFromLobby,
}