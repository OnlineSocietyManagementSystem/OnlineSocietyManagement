import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/sidebar";
import { toast } from "react-toastify";

function AdminNotices() {
  const [notices, setNotices] = useState([]);
  const [newNotice, setNewNotice] = useState({
    title: "",
    description: "",
  });
  const [showForm, setShowForm] = useState(false);

  // Fetch notices from the API
  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}all-notices`);
      setNotices(response.data);
    } catch (error) {
      console.error("Error fetching notices:", error);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNotice({
      ...newNotice,
      [name]: value,
    });
  };

  // Handle form submission to add a new notice
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}add-notice`, newNotice, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNewNotice({ title: "", description: "" });
      fetchNotices();
      toast.success("Notice added successfully.");
      setShowForm(false);
    } catch (error) {
      console.error("Error adding notice:", error);
      toast.error("Error adding notice.");
    }
  };

  const handleDelete = async (noticeId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}delete-notice/${noticeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Notice deleted successfully.");
      fetchNotices();
    } catch (error) {
      toast.error("Error deleting notice.");
      console.error("Error deleting notice:", error);
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="flex-grow-1 p-4" style={{ marginLeft: "20%" }}>
        <nav
          className="navbar navbar-expand-lg navbar-light mb-4"
          style={{ backgroundColor: "#A9B5DF" }}
        >
          <span className="navbar-brand fw-bold fs-3 px-4">Notices</span>
        </nav>

        {showForm ? (
          <div className="card mb-4">
            {/* <div className="card-header">
              <strong>Add New Notice</strong>
            </div> */}
            <div className="card-body">
              <form onSubmit={handleFormSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-bold">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={newNotice.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    value={newNotice.description}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
                <div className="d-flex">
                  <button type="submit" className="btn btn-primary fw-bold me-3">
                    Add Notice
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger "
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <button
              className="btn btn-primary mb-4"
              onClick={() => setShowForm(true)}
            >
              Click here to add a notice
            </button>
          </div>
        )}

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
                      <span>{notice.title}</span>
                      <span
                        className="badge"
                        style={{ backgroundColor: "#23044a", color: "#ffffff" }}
                      >
                        {notice.date}
                      </span>
                    </div>
                  </div>
                  <div className="card-body">
                    <p className="card-text text-dark">{notice.description}</p>
                  </div>
                  <div className="card-footer text-muted">
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="mb-0 fw-bold">Date: {notice.createdOn}</p>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(notice.id)}
                      >
                        Delete
                      </button>
                    </div>
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

export default AdminNotices;
