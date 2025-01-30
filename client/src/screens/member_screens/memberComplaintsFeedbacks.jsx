import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar";
import axios from "axios";

function MemberComplaintsFeedbacks() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [feedbackContent, setFeedbackContent] = useState("");
  const [complaints, setComplaints] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    // fetchComplaints();
    fetchFeedbacks();
  }, []);

  // const fetchComplaints = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:8080/complaints/all", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     setComplaints(response.data);
  //   } catch (error) {
  //     console.error("Error fetching complaints:", error);
  //   }
  // };

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

  const handleComplaintSubmit = async (e) => {
    e.preventDefault();

    const complaintData = { title, description };

    try {
      const response = await axios.post(
        "http://localhost:8080/complaints/add-complaint",
        complaintData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Complaint added successfully:", response.data);
      // Reset form fields
      setTitle("");
      setDescription("");
      // Fetch updated complaints to display the new one
      fetchComplaints();
    } catch (error) {
      console.error("Error adding complaint:", error);
    }
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();

    const feedbackData = { content: feedbackContent };

    try {
      const response = await axios.post(
        "http://localhost:8080/feedback/add-feedback",
        feedbackData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Feedback added successfully:", response.data);
      // Reset form field
      setFeedbackContent("");
      // Fetch updated feedbacks to display the new one
      fetchFeedbacks();
    } catch (error) {
      console.error("Error adding feedback:", error);
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

        <h2 className="mb-4 fw-bold">Add Complaint</h2>
        <form onSubmit={handleComplaintSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-danger btn-lg fw-bold">
            Add Complaint
          </button>
        </form>

        <h2 className="mt-4 mb-4 fw-bold">Complaints</h2>
        <div className="row">
          {complaints.map((complaint) => (
            <div className="col-md-6 mb-3" key={complaint.id}>
              <div
                className="card"
                style={{ backgroundColor: "#f8d7da", borderColor: "#f5c6cb" }}
              >
                <div className="card-body">
                  <h5 className="card-title fw-bold">{complaint.title}</h5>
                  <p className="card-text fw-bold fs-5">
                    {complaint.description}
                  </p>
                  <h6 className="card-subtitle mb-2 text-muted">
                    Member: {complaint.memberName}
                  </h6>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2 className="mt-4 mb-4 fw-bold">Add Feedback</h2>
        <form onSubmit={handleFeedbackSubmit}>
          <div className="mb-3">
            <label htmlFor="feedbackContent" className="form-label">
              Content
            </label>
            <textarea
              className="form-control"
              id="feedbackContent"
              value={feedbackContent}
              onChange={(e) => setFeedbackContent(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-success btn-lg fw-bold">
            Add Feedback
          </button>
        </form>

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

export default MemberComplaintsFeedbacks;
