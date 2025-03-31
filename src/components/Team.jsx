import React, { useState } from 'react';

function Team() {
  const [teamName, setTeamName] = useState('');
  const [players, setPlayers] = useState([]);

  const handleAddPlayer = (playerName) => {
    setPlayers([...players, playerName]);
  };

  return (
    <div className="team">
      <h2>Create Your Team</h2>
      <input 
        type="text" 
        placeholder="Enter Team Name" 
        value={teamName} 
        onChange={(e) => setTeamName(e.target.value)} 
      />
      <h3>Players:</h3>
      <ul>
        {players.map((player, index) => (
          <li key={index}>{player}</li>
        ))}
      </ul>
      <button onClick={() => handleAddPlayer('Player ' + (players.length + 1))}>
        Add Player
      </button>
      <p>Team: {teamName}</p>
    </div>
  );
}

export default Team;
