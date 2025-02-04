import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/sidebar";

function MemberAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);

  // Fetch announcements from the API
  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get("http://localhost:8080/all-notices");
      setAnnouncements(response.data);
    } catch (error) {
      console.error("Error fetching announcements:", error);
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
            Announcements
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

        <h2
          className="mb-4 text-dark"
          style={{ fontWeight: "bold", color: "#23044a" }}
        >
          Announcements
        </h2>

        {announcements.length > 0 ? (
          <div className="row row-cols-1 row-cols-md-2 g-4">
            {announcements.map((announcement) => (
              <div key={announcement.id} className="col">
                <div className="card border-0 shadow">
                  <div
                    className="card-header"
                    style={{
                      backgroundColor: "#e3d5f5",
                      color: "#23044a",
                      fontWeight: "bold",
                    }}
                  >
                    <div className="d-flex justify-content-between">
                      <span>{announcement.title}</span>
                      <span
                        className="badge"
                        style={{ backgroundColor: "#23044a", color: "#ffffff" }}
                      >
                        {announcement.date}
                      </span>
                    </div>
                  </div>
                  <div
                    className="card-body"
                    style={{ backgroundColor: "#f6edf9" }}
                  >
                    <p className="card-text text-dark">
                      {announcement.description}
                    </p>
                  </div>
                  <div className="card-footer text-muted">
                    <small>
                      <span className="fw-bold">Date:</span> {announcement.date}
                    </small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="alert alert-info text-center" role="alert">
            No announcements available.
          </div>
        )}
      </div>
    </div>
  );
}

export default MemberAnnouncements;
