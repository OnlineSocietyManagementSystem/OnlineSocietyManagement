import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const Homepage = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
      navigate('/login'); 
    };
  
    const handleRegister = () => {
      navigate('/signin'); 
    };

  return (
    <div className="container-fluid vh-100 d-flex flex-column align-items-center justify-content-center bg-light">
      <div className="text-center mb-5">
        <h1 className="display-4">Welcome to the Online Society Management System</h1>
        <p className="lead">Streamline your society's management with ease.</p>
      </div>
      <div className="d-flex gap-3">
        <button className="btn btn-primary btn-lg" onClick={handleLogin}>
          Login
        </button>
        <button className="btn btn-success btn-lg" onClick={handleRegister}>
          Register
        </button>
      </div>
    </div>
  );
};

export default Homepage;
