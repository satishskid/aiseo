import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BetaAuth } from './components/BetaAuth';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BetaAuth>
      <App />
    </BetaAuth>
  </React.StrictMode>
);