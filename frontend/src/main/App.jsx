import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './AppRoutes';

const App = () => {
  return (
    <div className="app-container">
      <Router>
          <AppRouter />
      </Router>
    </div>
  );
};

export default App;