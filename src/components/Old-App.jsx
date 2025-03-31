import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // Initialize state from localStorage, if available
  const [runs, setRuns] = useState(parseInt(localStorage.getItem('runs')) || 0);
  const [wickets, setWickets] = useState(parseInt(localStorage.getItem('wickets')) || 0);
  const [overs, setOvers] = useState(parseInt(localStorage.getItem('overs')) || 0);
  const [balls, setBalls] = useState(parseInt(localStorage.getItem('balls')) || 0);
  const [currentOver, setCurrentOver] = useState(JSON.parse(localStorage.getItem('currentOver')) || []);
  const [extraRuns, setExtraRuns] = useState(parseInt(localStorage.getItem('extraRuns')) || 0);
  const [completedOvers, setCompletedOvers] = useState(JSON.parse(localStorage.getItem('completedOvers')) || []);
  const [manualRuns, setManualRuns] = useState('');
  const [actionHistory, setActionHistory] = useState(JSON.parse(localStorage.getItem('actionHistory')) || []);

  // Save state to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('runs', runs);
    localStorage.setItem('wickets', wickets);
    localStorage.setItem('overs', overs);
    localStorage.setItem('balls', balls);
    localStorage.setItem('currentOver', JSON.stringify(currentOver));
    localStorage.setItem('extraRuns', extraRuns);
    localStorage.setItem('completedOvers', JSON.stringify(completedOvers));
    localStorage.setItem('actionHistory', JSON.stringify(actionHistory));
  }, [runs, wickets, overs, balls, currentOver, extraRuns, completedOvers, actionHistory]);

  // Function to clear all data
  const clearAllData = () => {
    // Reset state values to initial values
    setRuns(0);
    setWickets(0);
    setOvers(0);
    setBalls(0);
    setCurrentOver([]);
    setExtraRuns(0);
    setCompletedOvers([]);
    setActionHistory([]);
    setManualRuns('');

    // Clear localStorage
    localStorage.clear();
  };

  const addRun = (run) => {
    if (balls < 6) {
      setRuns(runs + run);
      setBalls(balls + 1);
      setCurrentOver([...currentOver, run]);
      setActionHistory([...actionHistory, { type: 'run', value: run }]);
    }
    if (balls === 6) {
      setOvers(overs + 1);
      setCompletedOvers([...completedOvers, { runs, wickets, extras: extraRuns, over: currentOver }]);
      setBalls(0);
      setCurrentOver([]);
      setExtraRuns(0);
    }
  };

  const addExtra = (type) => {
    const run = parseInt(manualRuns) || 0; // If manualRuns is invalid, default to 0
    setRuns(runs + run);
    setCurrentOver([...currentOver, `${type}(${run})`]);
    setActionHistory([...actionHistory, { type: 'extra', value: { type, run } }]);
  };

  const addWicket = () => {
    if (balls < 6) {
      setWickets(wickets + 1);
      setBalls(balls + 1);
      setCurrentOver([...currentOver, 'W']);
      setActionHistory([...actionHistory, { type: 'wicket', value: 'W' }]);
    }
    if (balls === 6) {
      setOvers(overs + 1);
      setCompletedOvers([...completedOvers, { runs, wickets, extras: extraRuns, over: currentOver }]);
      setBalls(0);
      setCurrentOver([]);
      setExtraRuns(0);
    }
  };

  const addDotBall = () => {
    if (balls < 6) {
      setBalls(balls + 1);
      setCurrentOver([...currentOver, '0']);
      setActionHistory([...actionHistory, { type: 'dot', value: '0' }]);
    }
    if (balls === 6) {
      setOvers(overs + 1);
      setCompletedOvers([...completedOvers, { runs, wickets, extras: extraRuns, over: currentOver }]);
      setBalls(0);
      setCurrentOver([]);
      setExtraRuns(0);
    }
  };

  const handleManualRun = () => {
    const run = parseInt(manualRuns);
    if (!isNaN(run) && run >= 0) {
      addRun(run);
      setManualRuns('');
    }
  };

  const undoAction = () => {
    const lastAction = actionHistory[actionHistory.length - 1];
    if (!lastAction) return;

    if (lastAction.type === 'run') {
      setRuns(runs - lastAction.value);
      setBalls(balls - 1);
      setCurrentOver(currentOver.slice(0, currentOver.length - 1));
    } else if (lastAction.type === 'extra') {
      setRuns(runs - lastAction.value.run);
      setCurrentOver(currentOver.slice(0, currentOver.length - 1));
    } else if (lastAction.type === 'wicket') {
      setWickets(wickets - 1);
      setBalls(balls - 1);
      setCurrentOver(currentOver.slice(0, currentOver.length - 1));
    } else if (lastAction.type === 'dot') {
      setBalls(balls - 1);
      setCurrentOver(currentOver.slice(0, currentOver.length - 1));
    }

    setActionHistory(actionHistory.slice(0, actionHistory.length - 1));
  };

  const redoAction = () => {
    const lastUndoneAction = actionHistory[actionHistory.length - 1];
    if (!lastUndoneAction) return;

    if (lastUndoneAction.type === 'run') {
      addRun(lastUndoneAction.value);
    } else if (lastUndoneAction.type === 'extra') {
      addExtra(lastUndoneAction.value.type);
    } else if (lastUndoneAction.type === 'wicket') {
      addWicket();
    } else if (lastUndoneAction.type === 'dot') {
      addDotBall();
    }
  };

  const eventStyle = (event) => {
    switch (event) {
      case 'W':
        return { color: 'red' };
      case 'WD':
        return { color: 'blue' };
      case 'NB':
        return { color: 'green' };
      default:
        return {};
    }
  };

  return (
    <div className="App">
      <h1>Cricket Scoreboard</h1>
      <div className="scoreboard">
        <div className="score">
          <p>Runs: {runs}</p>
          <p>Wickets: {wickets}</p>
          <p>Overs: {overs}</p>
          <p>Balls: {balls}</p>
          <p>Extras: {extraRuns}</p>
        </div>

        <div className="controls">
          <button onClick={addDotBall}>0</button>
          <button onClick={() => addRun(1)}>1</button>
          <button onClick={() => addRun(4)}>4</button>
          <button onClick={() => addRun(6)}>6</button>
          <button onClick={() => addExtra('WD')}>WD</button>
          <button onClick={() => addExtra('NB')}>NB</button>
          <button onClick={addWicket} style={{ backgroundColor: 'red' }}>W</button>
        </div>

        <div className="manual-input">
          <input
            type="number"
            value={manualRuns}
            onChange={(e) => setManualRuns(e.target.value)}
            placeholder="Enter Runs"
          />
          <button onClick={handleManualRun}>Add</button>
        </div>

        {currentOver.length > 0 && (
          <div className="current-over">
            <h3>Current Over:</h3>
            <ul>
              {currentOver.map((event, index) => (
                <li key={index} style={eventStyle(event)}>
                  {event}
                </li>
              ))}
            </ul>
          </div>
        )}

        {completedOvers.length > 0 && (
          <div className="completed-overs">
            <h3>Completed Overs</h3>
            <table>
              <thead>
                <tr>
                  <th>Over</th>
                  <th>Runs</th>
                  <th>Wickets</th>
                  <th>Extras</th>
                </tr>
              </thead>
              <tbody>
                {completedOvers.map((over, index) => (
                  <tr key={index}>
                    <td>
                      {over.over.map((event, i) => (
                        <span key={i} style={eventStyle(event)}>{event}, &nbsp;</span>
                      ))}
                    </td>
                    <td>{over.runs}</td>
                    <td>{over.wickets}</td>
                    <td>{over.extras}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="undo-redo">
          <button onClick={undoAction}>Undo</button>
          <button onClick={redoAction}>Redo</button>
        </div>

        {/* Clear All Data Button */}
        <div className="clear-all">
          <button onClick={clearAllData} style={{ backgroundColor: 'black', color: 'white' }}>
            Clear All Data
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
