import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthWrapper } from './components/AuthWrapper';
import { ApiKeyProvider } from './context/ApiKeyContext';
import { DemoAuthProvider } from './context/DemoAuthContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DemoAuthProvider>
      <ApiKeyProvider>
        <AuthWrapper />
      </ApiKeyProvider>
    </DemoAuthProvider>
  </React.StrictMode>
);