import React, { useState } from "react";
import Sidebar from "../../components/sidebar";

function AdminProfile() {
  // Static profile data
  const initialProfileData = {
    name: "John Doe",
    email: "johndoe@example.com",
    mobile: "1234567890",
    address: "123 hinjewadi, pune",
    role: "Admin",
    joinedDate: "2023-01-01",
  };

  const [profileData, setProfileData] = useState(initialProfileData);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleUpdateClick = () => {
    setIsEditing(!isEditing);
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
            Profile
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

        <h2 className="mb-4">Profile Information</h2>
        <div className="card shadow-sm p-4 mb-4 bg-white rounded">
          <div className="row">
            <div className="col-md-6">
              <div className="form-group mb-3">
                <label>
                  <strong>Name</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={profileData.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group mb-3">
                <label>
                  <strong>Email</strong>
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={profileData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group mb-3">
                <label>
                  <strong>Mobile</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="mobile"
                  value={profileData.mobile}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group mb-3">
                <label>
                  <strong>Address</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  value={profileData.address}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group mb-3">
                <label>
                  <strong>Role</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="role"
                  value={profileData.role}
                  onChange={handleChange}
                  disabled
                />
              </div>
              <div className="form-group mb-3">
                <label>
                  <strong>Joined Date</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="joinedDate"
                  value={profileData.joinedDate}
                  onChange={handleChange}
                  disabled
                />
              </div>
            </div>
          </div>
          <div className="text-center">
            <button
              className="btn btn-primary mt-3"
              
              onClick={handleUpdateClick}
            >
              {isEditing ? "Save Profile" : "Update Profile"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;
