import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
import AppRouter from './AppRouter';
// import './App.css';
import './App.scss';

// import App from './App';
import { ThemeProvider } from '@mui/material';
import { theme } from './Theme';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AppRouter />
    </ThemeProvider>

  </React.StrictMode>
);
