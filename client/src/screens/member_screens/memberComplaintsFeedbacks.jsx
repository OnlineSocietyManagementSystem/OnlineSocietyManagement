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
  const [showComplaintForm, setShowComplaintForm] = useState(false);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

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
      setShowComplaintForm(false); // Hide form after submission
    } catch (error) {
      console.error("Error adding complaint:", error);
    }
  };

  const handleDeleteComplaints = async (complaintId) => {
    try {
      await axios.put(
        `http://localhost:8080/delete-complaint/${complaintId}`,
        {},
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
      setShowFeedbackForm(false); // Hide form after submission
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
          style={{ backgroundColor: "#A9B5DF" }}
        >
          <span className="navbar-brand fw-bold fs-3 px-4">
            Complaints & Feedbacks
          </span>
        </nav>

        {/* <h2 className="mb-4 fw-bold">Add Complaint</h2> */}
        {showComplaintForm ? (
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
            <button
              type="submit"
              className="btn btn-success btn-lg fw-bold mb-3"
            >
              Add Complaint
            </button>
            <button
              type="button"
              className="btn btn-danger ms-3"
              onClick={() => setShowComplaintForm(false)}
            >
              Cancel
            </button>
          </form>
        ) : (
          <div className="text-center">
            <button
              className="btn btn-primary mb-4 fs-5 fw-bold"
              onClick={() => setShowComplaintForm(true)}
            >
              Click here to add a complaint
            </button>
          </div>
        )}

        <h2 className="mb-4 fw-bold" style={{ color: "#2D336B" }}>
          Complaints
        </h2>
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
                  <p className="card-text text-dark">{complaint.description}</p>
                </div>
                <div className="card-footer text-muted">
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="mb-0 fw-bold">Date: {complaint.createdOn}</p>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteComplaints(complaint.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <hr />

        {/* <h2 className="mt-4 mb-4 fw-bold">Add Feedback</h2> */}
        {showFeedbackForm ? (
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
            <button
              type="button"
              className="btn btn-danger ms-3"
              onClick={() => setShowFeedbackForm(false)}
            >
              Cancel
            </button>
          </form>
        ) : (
          <div className="text-center">
            <button
              className="btn btn-primary mb-2 fs-5 fw-bold"
              onClick={() => setShowFeedbackForm(true)}
            >
              Click here to add feedback
            </button>
          </div>
        )}

        <h2 className="mt-4 mb-4 fw-bold" style={{ color: "#2D336B" }}>
          Feedbacks
        </h2>
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
                  <p className="card-text text-dark">{feedback.content}</p>
                </div>
                <div className="card-footer text-muted ">
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="mb-0 fw-bold">Date: {feedback.createdOn}</p>
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
