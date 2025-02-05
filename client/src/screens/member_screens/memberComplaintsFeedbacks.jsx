import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar";
import axios from "axios";
import { toast } from "react-toastify";

function MemberComplaintsFeedbacks() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [feedbackContent, setFeedbackContent] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);
  const [complaints, setComplaints] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchFeedbacks();
    fetchComplaints();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get("http://localhost:8080/all-feedbacks", { // here we have to add my -feedbacks
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
      const response = await axios.get("http://localhost:8080/my-complaints", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setComplaints(response.data);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
  };

  const handleComplaintSubmit = async (e) => {
    e.preventDefault();

    const complaintData = { title, description };

    try {
      const response = await axios.post(
        "http://localhost:8080/add-complaint",
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
      toast.success("Complaint added successfully.");
      fetchComplaints();
    } catch (error) {
      console.error("Error adding complaint:", error);
    }
  };

  const handleDeleteComplaints = async (complaintId) => {
    try {
      await axios.delete(
        `http://localhost:8080/delete-complaint/${complaintId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Complaint Deleted Successfully");
      fetchComplaints(); // Refresh feedback list
    } catch (error) {
      toast.error("Error Deleting complaint");
      console.error("Error deleting complaint:", error);
    }
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
// new comment 
    const feedbackData = { content: feedbackContent };

    try {
      const response = await axios.post(
        "http://localhost:8080/add-feedback",
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

  const handleDeleteFeedback = async (feedbackId) => {
    try {
      await axios.delete(
        `http://localhost:8080/delete-feedback/${feedbackId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Feedback Deleted Successfully");
      fetchFeedbacks(); // Refresh feedback list
    } catch (error) {
      toast.error("Error Deleting feedback");
      console.error("Error deleting feedback:", error);
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
                  <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteComplaints(complaint.id)}
                    >
                      Delete
                    </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <hr />

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
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="card-text fw-bold fs-5 mb-0">
                      {feedback.content}
                    </p>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteFeedback(feedback.id)}
                    >
                      Delete
                    </button>
                  </div>
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
