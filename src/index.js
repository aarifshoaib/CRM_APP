import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <Link to="/new-form" className="btn btn-primary">
        Create New Form
      </Link>
    </div>
  );
};

export default Home;