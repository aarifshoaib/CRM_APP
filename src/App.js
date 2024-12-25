// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';  // Import the Home component
import NewForm from './components/NewForm';  // Import the NewForm component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />  {/* Route to Home page */}
        <Route path="/new-form" element={<NewForm />} />  {/* Route to NewForm page */}
      </Routes>
    </Router>
  );
};

export default App;