import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar";

function AdminAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);

  // Utility function to calculate relative date
  const getRelativeDate = (dateString) => {
    const today = new Date();
    const announcementDate = new Date(dateString);

    const diffTime = today - announcementDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    return dateString; // Default format for older dates
  };

  // Mock fetch announcements
  useEffect(() => {
    const fetchedAnnouncements = [
      {
        id: 1,
        title: "Water Supply Disruption",
        description: "Water supply will be disrupted on 25th Dec from 9 AM to 5 PM due to maintenance.",
        date: "2024-12-24", // Today's date
        category: "Maintenance",
      },
      {
        id: 2,
        title: "Diwali Celebration",
        description: "Join us for the Diwali celebration on 31st Oct at 7 PM in the community hall.",
        date: "2024-12-23", // Yesterday
        category: "Event",
      },
      {
        id: 3,
        title: "Fire Drill Notice",
        description: "Fire drill will be conducted on 28th Dec at 3 PM in Block A.",
        date: "2024-12-20", // Older date
        category: "Safety",
      },
    ];
    setAnnouncements(fetchedAnnouncements);
  }, []);

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="flex-grow-1 p-4" style={{ marginLeft: "20%" }}>
        <h2 className="mb-4 text-dark" style={{ fontWeight: "bold", color: "#23044a" }}>
          Announcements
        </h2>

        {announcements.length > 0 ? (
          <div className="row row-cols-1 row-cols-md-2 g-4">
            {announcements.map((announcement) => (
              <div key={announcement.id} className="col">
                <div className="card border-0 shadow">
                  <div
                    className="card-header"
                    style={{ backgroundColor: "#e3d5f5", color: "#23044a", fontWeight: "bold" }}
                  >
                    <div className="d-flex justify-content-between">
                      <span>{announcement.title}</span>
                      <span className="badge" style={{ backgroundColor: "#23044a", color: "#ffffff" }}>
                        {getRelativeDate(announcement.date)}
                      </span>
                    </div>
                  </div>
                  <div className="card-body" style={{ backgroundColor: "#f6edf9" }}>
                    <p className="card-text text-dark">{announcement.description}</p>
                  </div>
                  <div className="card-footer text-muted">
                    <small>
                      <span className="fw-bold">Category:</span> {announcement.category} |{" "}
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

export default AdminAnnouncements;
