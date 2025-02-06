import React from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../../images/background.jpg";
import swimmingPool from "../../images/swimmingPool.jpg"; // Reference images
import gym from "../../images/gym.jpg"; // Reference images
import clubHouse from "../../images/clubhouse.jpg"; // Reference images
import tennisCourt from "../../images/tennisCourt.jpg"; // Reference images
import garden from "../../images/garden.jpg"; // Reference images

const Homepage = () => {
  const navigate = useNavigate();

  const facilities = [
    { title: "Swimming Pool", description: "State-of-the-art swimming pool with lifeguard.", image: swimmingPool },
    { title: "Gym", description: "Fully equipped gym with personal trainers available.", image: gym },
    { title: "Clubhouse", description: "Spacious clubhouse for events and gatherings.", image: clubHouse },
    { title: "Tennis Court", description: "Professional grade tennis court with coaching.", image: tennisCourt },
    { title: "Garden", description: "Beautiful garden with walking paths and benches.", image: garden },
  ];

  const testimonials = [
    { name: "John Doe", feedback: "The society management system has greatly improved our community's efficiency." },
    { name: "Jane Smith", feedback: "I love the new facilities and the ease of booking them online." },
    { name: "Alice Johnson", feedback: "Fantastic platform for managing our society's needs. Highly recommend!" },
  ];

  return (
    <div
      className="container-fluid d-flex flex-column align-items-center justify-content-center text-white"
      style={{
        position: "relative",
        minHeight: "100vh",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        paddingBottom: "100px",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          zIndex: 1,
        }}
      ></div>

      <div className="text-center mb-5 p-4 rounded" style={{ zIndex: 2, backdropFilter: "blur(10px)" }}>
        <h1 className="display-4">Welcome to the Online Society Management System</h1>
        <p className="lead">Streamline your society's management with ease.</p>
      </div>

      <div className="d-flex gap-3 mb-5" style={{ zIndex: 2 }}>
        <button className="btn btn-primary btn-lg shadow" onClick={() => navigate("/signin")}>
          Login
        </button>
        <button className="btn btn-success btn-lg shadow" onClick={() => navigate("/register")}>
          Register
        </button>
      </div>

      <div className="container mb-5" style={{ zIndex: 2 }}>
        <h2 className="text-center mb-4">Our Facilities and Amenities</h2>
        <div className="row justify-content-center">
          {facilities.map((facility, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card shadow-sm h-100">
                <img src={facility.image} className="card-img-top" alt={facility.title} style={{ height: "200px", objectFit: "cover" }} />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{facility.title}</h5>
                  <p className="card-text">{facility.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-center my-4">Society Highlights</h2>
        <div className="row justify-content-center mb-5">
          {facilities.map((facility, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card shadow-sm h-100">
                <img src={facility.image} className="card-img-top" alt={facility.title} style={{ height: "200px", objectFit: "cover" }} />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{facility.title}</h5>
                  <p className="card-text">{facility.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-center mb-4">Testimonials</h2>
        <div className="row justify-content-center">
          {testimonials.map((testimonial, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card shadow-sm h-100">
                <div className="card-body d-flex flex-column">
                  <p className="card-text">"{testimonial.feedback}"</p>
                  <h6 className="card-subtitle mt-auto mb-2 text-muted">- {testimonial.name}</h6>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="position-absolute bottom-0 text-center w-100 py-3" style={{ zIndex: 2, backdropFilter: "blur(10px)" }}>
        <p className="mb-0">&copy; 2025 Society Management. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Homepage;
