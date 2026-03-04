import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

try {
  const rootElement = document.getElementById('root');
  if (!rootElement) throw new Error('Failed to find the root element');
  
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
} catch (error) {
  console.error('App mounting failed:', error);
  const debug = document.getElementById('debug-log');
  if (debug) {
    debug.style.display = 'block';
    debug.innerHTML += '<div>MOUNT ERROR: ' + error + '</div>';
  }
}
