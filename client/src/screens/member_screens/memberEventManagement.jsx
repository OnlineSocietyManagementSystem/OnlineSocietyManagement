import React from "react";
import Sidebar from "../../components/sidebar";

// Sample static data
const events = [
  { 
    title: 'Community Meeting', 
    description: 'A monthly community meeting to discuss upcoming projects and issues.', 
    location: 'Clubhouse', 
    date: '2025-02-20', 
    time: '18:00' 
  },
  { 
    title: 'Yoga Class', 
    description: 'Join us for a relaxing yoga session in the garden.', 
    location: 'Community Garden', 
    date: '2025-02-25', 
    time: '07:00' 
  },
  { 
    title: 'Pool Party', 
    description: 'Fun and games at the pool. Refreshments will be provided.', 
    location: 'Swimming Pool', 
    date: '2025-03-05', 
    time: '15:00' 
  },
  { 
    title: 'Book Club Meeting', 
    description: 'Discuss the book of the month with fellow book lovers.', 
    location: 'Library', 
    date: '2025-03-10', 
    time: '17:00' 
  }
];

function MemberEventManagement() {
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
