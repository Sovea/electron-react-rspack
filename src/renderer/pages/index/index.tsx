import electronLogo from 'assets/electron.svg';
import reactLogo from 'assets/react.png';
import rspackLogo from 'assets/rspack.png';
import { createRoot } from 'react-dom/client';
import './index.css';

function App() {
  return (
    <div className="app">
      <div className="logo-container">
        <a href="https://reactjs.org" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo" alt="React logo" />
        </a>
        <a href="https://electronjs.org" target="_blank" rel="noreferrer">
          <img src={electronLogo} className="logo" alt="Electron logo" />
        </a>
        <a href="https://rspack.rs" target="_blank" rel="noreferrer">
          <img src={rspackLogo} className="logo" alt="Rspack logo" />
        </a>
      </div>
      <h1>Electron + Rspack + React + TypeScript</h1>
    </div>
  );
}

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(<App />);
}
