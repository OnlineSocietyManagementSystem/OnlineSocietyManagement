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
      const response = await axios.get("http://13.201.73.36:8080/all-events");
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
        <nav className="navbar navbar-expand-lg navbar-light mb-4" style={{ backgroundColor: "#A9B5DF" }}>
          <span className="navbar-brand fw-bold fs-3 px-4" >Event Management</span>
        </nav>

        <h2 className="mb-4">Upcoming Events</h2>
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {events.length > 0 ? (
            events.map((event, index) => (
              <div key={event.id} className="col">
                <div className="card border-0 shadow">
                  <div
                    className="card-header fs-4"
                    style={{
                      backgroundColor: "#2D336B",
                      color: "#FFF2F2",
                      fontWeight: "bold",
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <span>{event.title}</span>
                    </div>
                  </div>
                  <div
                    className="card-body"
                    
                  >
                    <p className="card-text">
                      <strong>Description: </strong> {event.description}
                    </p>
                  </div>
                  <div
                    className="card-footer "
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="card-text">
                        <strong>Date:</strong> {event.date}
                      </p>
                      <p className="card-text">
                        <strong>Location:</strong> {event.location}
                      </p>
                      <p className="card-text">
                        <strong>Time:</strong> {event.time}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="alert alert-info text-center" role="alert">
              No events found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MemberEventManagement;
