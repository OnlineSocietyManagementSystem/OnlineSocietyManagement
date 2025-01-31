import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar";
import axios from "axios";

function MemberEventManagement() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:8080/all-events");
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="flex-grow-1 p-4" style={{ marginLeft: "20%" }}>
        {/* Add Navbar at the top using Bootstrap classes */}
        <nav
          className="navbar navbar-expand-lg navbar-light mb-4"
          style={{ backgroundColor: "#e3d5f5" }}
        >
          <a className="navbar-brand fw-bold fs-3 px-4" href="#">
            Event Management
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </nav>

        <h2 className="mb-4">Upcoming Events</h2>
        <div className="row">
          {events.map((event, index) => (
            <div className="col-md-6 mb-3" key={index}>
              <div className="card" style={{ backgroundColor: '#f3edfa', borderColor: '#0f0f0f' }}>
                <div className="card-body">
                  <h5 className="card-title fw-bold">{event.title}</h5>
                  <p className="card-text"><strong>Description:</strong> {event.description}</p>
                  <p className="card-text"><strong>Location:</strong> {event.location}</p>
                  <p className="card-text"><strong>Date:</strong> {new Date(event.date).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                  <p className="card-text"><strong>Time:</strong> {event.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MemberEventManagement;
