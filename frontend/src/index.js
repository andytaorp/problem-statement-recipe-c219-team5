import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RecipeContextProvider } from './context/RecipeContext'
import { AuthContextProvider } from './context/AuthContext'
import { AIContextProvider } from './context/AiContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <RecipeContextProvider>
        <AIContextProvider>
          <App />
        </AIContextProvider>
      </RecipeContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);