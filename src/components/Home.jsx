import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home">
      <h1>Welcome to the Cricket App!</h1>
      <nav>
        <ul>
          <li><Link to="/team">Create Team</Link></li>
          <li><Link to="/scoreboard">View Scoreboard</Link></li>
          <li><Link to="/players">Manage Players</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Home;
