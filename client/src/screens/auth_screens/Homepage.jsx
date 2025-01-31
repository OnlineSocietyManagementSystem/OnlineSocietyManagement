import React from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../../images/background.jpg"

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className="container-fluid vh-100 d-flex flex-column align-items-center justify-content-center text-white" style={{
      position: "relative",
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}>
      {/* Overlay */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        zIndex: 1,
      }}></div>
      
      <div className="text-center mb-5 p-4 rounded" style={{ zIndex: 2, backdropFilter: "blur(10px)" }}>
        <h1 className="display-4">Welcome to the Online Society Management System</h1>
        <p className="lead">Streamline your society's management with ease.</p>
      </div>
      
      <div className="d-flex gap-3" style={{ zIndex: 2 }}>
        <button className="btn btn-primary btn-lg shadow" onClick={() => navigate("/signin")}>Login</button>
        <button className="btn btn-success btn-lg shadow" onClick={() => navigate("/register")}>Register</button>
      </div>
      
      <footer className="position-absolute bottom-0 text-center w-100 py-3" style={{ zIndex: 2, backdropFilter: "blur(10px)" }}>
        <p className="mb-0">&copy; 2025 Society Management. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Homepage;
