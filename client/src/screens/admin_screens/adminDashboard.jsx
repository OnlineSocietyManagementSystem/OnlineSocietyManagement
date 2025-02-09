import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/sidebar";

function AdminDashboard() {
  const [latestNotice, setLatestNotice] = useState(null);
  const [latestEvent, setLatestEvent] = useState(null);

  const fetchNotices = async () => {
    try {
      const response = await axios.get("http://localhost:8080/all-notices");
      const notices = response.data;

      // Sort notices by updatedOn date in descending order
      notices.sort((a, b) => new Date(b.updatedOn) - new Date(a.updatedOn));

      if (notices.length > 0) {
        setLatestNotice(notices[0]);
      }
    } catch (error) {
      console.error("Error fetching notices:", error);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:8080/all-events");
      const events = response.data;

      // Sort events by updatedOn date in descending order
      events.sort((a, b) => new Date(b.updatedOn) - new Date(a.updatedOn));

      if (events.length > 0) {
        setLatestEvent(events[0]);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchNotices();
    fetchEvents();
  }, []);

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="flex-grow-1 p-4" style={{ marginLeft: "20%" }}>
        {/* Add Navbar at the top using Bootstrap classes */}
        <nav className="navbar navbar-expand-lg navbar-light mb-4" style={{ backgroundColor: "#A9B5DF" }}>
          <span className="navbar-brand fw-bold fs-3 px-4">Dashboard</span>
        </nav>

        <div className="container">
          <div className="row">
            <div className="col-12 mb-4">
              {latestNotice ? (
                <div className="card border-0 shadow">
                  <div
                    className="card-header"
                    style={{
                      backgroundColor: "#2D336B",
                      color: "rgb(255, 255, 255)",
                      fontWeight: "bold",
                    }}
                  >
                    <h5 className="card-title fw-bold">{latestNotice.title}</h5>
                  </div>
                  <div className="card-body">
                    <p className="card-text">{latestNotice.description}</p>
                    <p className="card-text">
                      <small >
                        Date: {latestNotice.createdOn}
                      </small>
                    </p>
                  </div>
                </div>
              ) : (
                <p>No notices available.</p>
              )}
            </div>

            <div className="col-12 mb-4">
              {latestEvent ? (
                <div className="card border-0 shadow">
                  <div
                    className="card-header"
                    style={{
                      backgroundColor: "#2D336B",
                      color: "rgb(255, 255, 255)",
                      fontWeight: "bold",
                    }}
                  >
                    <h5 className="card-title fw-bold">{latestEvent.title}</h5>
                  </div>
                  <div className="card-body">
                    <p className="card-text">{latestEvent.description}</p>
                    <p className="card-text">
                      <small>
                        Date: {latestEvent.date}
                      </small>
                    </p>
                  </div>
                </div>
              ) : (
                <p>No events available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
