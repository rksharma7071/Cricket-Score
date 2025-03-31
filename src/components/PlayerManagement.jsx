import React, { useState } from 'react';

function PlayerManagement() {
  const [playerName, setPlayerName] = useState('');
  const [players, setPlayers] = useState([]);

  const handleAddPlayer = () => {
    setPlayers([...players, playerName]);
    setPlayerName('');
  };

  return (
    <div className="player-management">
      <h2>Manage Players</h2>
      <input 
        type="text" 
        value={playerName} 
        onChange={(e) => setPlayerName(e.target.value)} 
        placeholder="Enter player name"
      />
      <button onClick={handleAddPlayer}>Add Player</button>

      <h3>Player List</h3>
      <ul>
        {players.map((player, index) => (
          <li key={index}>{player}</li>
        ))}
      </ul>
    </div>
  );
}

export default PlayerManagement;
