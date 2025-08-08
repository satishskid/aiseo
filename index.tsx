import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BetaAuth } from './components/BetaAuth';
import { ApiKeyProvider } from './context/ApiKeyContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApiKeyProvider>
      <BetaAuth>
        <App />
      </BetaAuth>
    </ApiKeyProvider>
  </React.StrictMode>
);