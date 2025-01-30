import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar";
import axios from "axios";

function AdminComplaintsFeedbacks() {
  const [feedbacks, setFeedbacks] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
      fetchFeedbacks();
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

  // Sample static data for complaints
  const complaints = [
    { id: 1, memberName: 'John Doe', flatNo: '101', mobileNo: '1234567890', message: 'Water leakage issue in the bathroom.' },
    { id: 2, memberName: 'Jane Smith', flatNo: '102', mobileNo: '0987654321', message: 'Elevator not working properly.' }
  ];

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
          Complaints & Feedbacks
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

        <h2 className="mb-4">Complaints</h2>
        <div className="row">
          {complaints.map((complaint) => (
            <div className="col-md-6 mb-3" key={complaint.id}>
              <div className="card" style={{ backgroundColor: '#f8d7da', borderColor: '#f5c6cb' }}>
                <div className="card-body">
                  <h5 className="card-title fw-bold">{complaint.memberName}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">Flat No: {complaint.flatNo}</h6>
                  <h6 className="card-subtitle mb-2 text-muted">Mobile No: {complaint.mobileNo}</h6>
                  <p className="card-text fw-bold fs-5">{complaint.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2 className="mt-4 mb-4 fw-bold">Feedbacks</h2>
        <div className="row">
          {feedbacks.map((feedback) => (
            <div className="col-md-6 mb-3" key={feedback.id}>
              <div
                className="card"
                style={{ backgroundColor: "#d4edda", borderColor: "#c3e6cb" }}
              >
                <div className="card-body">
                  <p className="card-text fw-bold fs-5">{feedback.content}</p>
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
