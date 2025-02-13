import React from "react";
import { useNavigate } from "react-router-dom";
import swimmingPool from "../../images/swimmingPool.jpg";
import gym from "../../images/gym.jpg";
import clubHouse from "../../images/clubHouse.jpg";
import tennisCourt from "../../images/tennisCourt.jpg";
import garden from "../../images/garden.jpg";
import library from "../../images/library.jpg";
import HomeworkIcon from "@mui/icons-material/Homework";
import "./HomePage.css"; 

const Homepage = () => {
  const navigate = useNavigate();

  const facilities = [
    {
      title: "Swimming Pool",
      description: "State-of-the-art swimming pool with lifeguard.",
      image: swimmingPool,
    },
    {
      title: "Gym",
      description: "Fully equipped gym with personal trainers available.",
      image: gym,
    },
    {
      title: "Clubhouse",
      description: "Spacious clubhouse for events and gatherings.",
      image: clubHouse,
    },
    {
      title: "Tennis Court",
      description: "Professional grade tennis court with coaching.",
      image: tennisCourt,
    },
    {
      title: "Garden",
      description: "Beautiful garden with walking paths and benches.",
      image: garden,
    },
    {
      title: "Library",
      description:
        "Quiet library with a wide collection of books and study areas.",
      image: library,
    },
  ];

  const testimonials = [
    {
      name: "Shradha Kulkarni",
      feedback: "This system has improved our community's efficiency.",
    },
    {
      name: "Shrusti parlikar",
      feedback: "I love the ease of booking facilities online.",
    },
    {
      name: "Pavankumar Bhamare",
      feedback: "Fantastic platform for managing our society's needs!",
    },
    {
      name: "Dhananjay Gayke",
      feedback: "This is the best platform that i have used till now",
    },
  ];

  return (
    <div className="container-fluid p-0">
      {/* Hero Section */}
      <div
        className="text-white d-flex flex-column align-items-center justify-content-center text-center p-5"
        style={{ background: "#003366", minHeight: "60vh" }}
      >
        <HomeworkIcon style={{ fontSize: 150, marginRight: "10px" }} />
        <h1 className="display-2 fw-bold">Welcome to SocioHub</h1>
        <p className="lead">Managing your society made easy and efficient.</p>
        <div className="mt-3">
          <button
            className="btn btn-primary btn-lg me-3 fw-bold"
            onClick={() => navigate("/signin")}
          >
            Login
          </button>
          <button
            className="btn btn-success btn-lg fw-bold"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
      </div>

      {/* Facilities Section */}
      <div className="container py-5">
        <h2 className="text-center mb-4 fw-bold">Our Facilities</h2>
        <div className="row">
          {facilities.map((facility, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card shadow-lg facility-card">
                <img
                  src={facility.image}
                  className="card-img-top"
                  alt={facility.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{facility.title}</h5>
                  <p className="card-text">{facility.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Features Section */}
      <div className="container py-5">
        <h2 className="text-center mb-4 fw-bold">Key Features</h2>
        <div className="row">

          <div className="col-md-4 mb-4">
            <div className="card text-center shadow-sm feature-card" style={{ backgroundColor: "#A9B5DF" }}>
              <div className="card-body">
                <i className="fas fa-calendar-check fa-3x mb-3"></i>
                <h5 className="card-title">Easy Booking</h5>
                <p className="card-text">
                  Quickly book facilities and manage reservations online.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card text-center shadow-sm feature-card" style={{ backgroundColor: "#A9B5DF" }}>
              <div className="card-body">
                <i className="fas fa-bell fa-3x mb-3"></i>
                <h5 className="card-title">Notifications</h5>
                <p className="card-text">Receive timely notifications and updates.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card text-center shadow-sm feature-card" style={{ backgroundColor: "#A9B5DF" }}>
              <div className="card-body">
                <i className="fas fa-bell fa-3x mb-3"></i>
                <h5 className="card-title">Complaints & Feedbacks</h5>
                <p className="card-text">give complaints and Feedbacks whenever you want.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card text-center shadow-sm feature-card" style={{ backgroundColor: "#A9B5DF" }}>
              <div className="card-body">
                <i className="fas fa-user-shield fa-3x mb-3"></i>
                <h5 className="card-title">Security</h5>
                <p className="card-text">Ensure the safety of your community with our security features.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="container py-5 bg-light">
        <h2 className="text-center mb-4 fw-bold">What Our Members Say</h2>
        <div className="row">
          {testimonials.map((testimonial, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card shadow-sm testimonial-card" style={{ backgroundColor: "#A9B5DF" }}>
                <div className="card-body">
                  <p className="card-text">"{testimonial.feedback}"</p>
                  <h6 className="card-subtitle text-muted">- {testimonial.name}</h6>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-3 bg-dark text-white">
        <p className="mb-0">&copy; 2025 Society Management. All rights reserved.</p>
        <button
          className="btn btn-primary me-3"
          onClick={() => navigate("/guestpage")}
        >
          Guard Page
        </button>
      </footer>
    </div>
  );
};

export default Homepage;
