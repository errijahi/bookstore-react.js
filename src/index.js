import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextPorvider } from './context/authContext';
import { ThemeProvider } from './context/themeContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextPorvider>
      <ThemeProvider>
        <App />
    </ThemeProvider>
    </AuthContextPorvider>
  </React.StrictMode>
);

