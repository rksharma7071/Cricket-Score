import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, createBrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import Team from './components/Team';
import Scoreboard from './components/Scoreboard';
import PlayerManagement from './components/PlayerManagement';
import App from './App';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/team",
    element: <Team />,
  },
  {
    path: "/scoreboard",
    element: <Scoreboard />,
  },
  {
    path: "/players",
    element: <PlayerManagement />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter router={router}>
      <App />
    </BrowserRouter>
  </StrictMode>
);
