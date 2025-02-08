import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar";
import axios from "axios";

function AdminComplaintsFeedbacks() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [complaints, setComplaints] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchFeedbacks();
    fetchComplaints();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get("http://localhost:8080/all-feedbacks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFeedbacks(response.data);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  };

  const fetchComplaints = async () => {
    try {
      const response = await axios.get("http://localhost:8080/all-complaints", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setComplaints(response.data);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="flex-grow-1 p-4" style={{ marginLeft: "20%" }}>
        <nav className="navbar navbar-expand-lg navbar-light mb-4" style={{ backgroundColor: "#A9B5DF" }}>
          <span className="navbar-brand fw-bold fs-3 px-4" style={{ color: "#2D336B" }}>Complaints & Feedbacks</span>
        </nav>

        <h2 className="mb-4 fw-bold" style={{ color: "#2D336B" }}>Complaints</h2>
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {complaints.map((complaint) => (
            <div key={complaint.id} className="col">
              <div className="card border-0 shadow">
                <div
                  className="card-header"
                  style={{
                    backgroundColor: "#2D336B",
                    color: "#FFF2F2",
                    fontWeight: "bold",
                  }}
                >
                  <div className="d-flex justify-content-between">
                    <span>{complaint.title}</span>
                    <span
                      className="badge"
                      style={{ backgroundColor: "#7886C7", color: "#FFF2F2" }}
                    >
                      {complaint.date}
                    </span>
                  </div>
                </div>
                <div
                  className="card-body"
                  // style={{ backgroundColor: "#A9B5DF" }}
                >
                  <p className="card-text text-dark">
                    {complaint.description}
                  </p>
                </div>
                <div className="card-footer text-muted">
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="mb-0 fw-bold">
                      Date: {complaint.creationDate}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <hr />

        <h2 className="mt-4 mb-4 fw-bold" style={{ color: "#2D336B" }}>Feedbacks</h2>
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {feedbacks.map((feedback) => (
            <div key={feedback.id} className="col">
              <div className="card border-0 shadow">
                <div
                  className="card-header"
                  style={{
                    backgroundColor: "#2D336B",
                    color: "#FFF2F2",
                    fontWeight: "bold",
                  }}
                >
                  Feedback
                </div>
                <div
                  className="card-body"
                  // style={{ backgroundColor: "#A9B5DF" }}
                >
                  <p className="card-text text-dark">
                    {feedback.content}
                  </p>
                </div>
                <div className="card-footer text-muted">
                  <p className="mb-0 fw-bold">
                    Date: {feedback.createdOn}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminComplaintsFeedbacks;
