import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/sidebar";

function MemberNotices() {
  const [notices, setNotices] = useState([]);

  // Fetch notices from the API
  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const response = await axios.get("http://13.201.73.36:8080/all-notices");
      setNotices(response.data);
    } catch (error) {
      console.error("Error fetching notices:", error);
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="flex-grow-1 p-4" style={{ marginLeft: "20%" }}>
        {/* Add Navbar at the top using Bootstrap classes */}
        <nav className="navbar navbar-expand-lg navbar-light mb-4" style={{ backgroundColor: "#A9B5DF" }}>
          <span className="navbar-brand fw-bold fs-3 px-4" >Notices</span>
        </nav>

        <h2
          className="mb-4 text-dark"
          style={{ fontWeight: "bold", color: "#23044a" }}
        >
          Notices
        </h2>

        {notices.length > 0 ? (
          <div className="row row-cols-1 row-cols-md-2 g-4">
            {notices.map((notice) => (
              <div key={notice.id} className="col">
                <div className="card border-0 shadow">
                  <div
                    className="card-header"
                    style={{
                      backgroundColor: "#2D336B",
                      color: "rgb(255, 255, 255)",
                      fontWeight: "bold",
                    }}
                  >
                    <div className="d-flex justify-content-between">

                      <span className="fs-4">{notice.title}</span>
                      <span
                        className="badge"
                        style={{ backgroundColor: "#23044a", color: "#ffffff" }}
                      >
                        {notice.date}
                      </span>
                    </div>
                  </div>
                  <div
                    className="card-body"
                  >
                    <p className="card-text text-dark">
                      {notice.description}
                    </p>
                  </div>
                  <div className="card-footer text-muted">
                    <small>
                      <span className="fw-bold">Date:</span> {notice.createdOn}
                    </small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="alert alert-info text-center" role="alert">
            No notices available.
          </div>
        )}
      </div>
    </div>
  );
}

export default MemberNotices;
