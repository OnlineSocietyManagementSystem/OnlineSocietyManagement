import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/sidebar";
import { toast } from "react-toastify";

function MemberProfile() {
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    phone: "",
    building: "",
    flatNo: "",
    floor: "",
    aadhar: "",
    familyCount: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const token = localStorage.getItem("token"); // Assuming the token is stored after login
      const response = await axios.get(`http://localhost:8080/my-profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;

      // Ensure all fields have a string value
      const updatedData = {
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        email: data.email || "",
        role: data.role ?? "",
        phone: data.phone || "",
        building: data.building || "",
        flatNo: data.flatNo !== undefined ? data.flatNo : "",
        floor: data.floor !== undefined ? data.floor : "",
        aadhar: data.aadhar || "",
        familyCount: data.familyCount !== undefined ? data.familyCount : "",
      };

      setProfileData(updatedData);
    } catch (error) {
      console.error("Error fetching profile data:", error);
      toast.error("Error fetching profile data.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleUpdateClick = async () => {
    if (isEditing) {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token not found in localStorage");
        }
        console.log("Token retrieved:", token);
        console.log("Profile data to be sent:", profileData);
        
        const response = await axios.put(`http://localhost:8080/update-profile`, profileData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Profile updated successfully.");
        console.log("Profile updated successfully:", response.data);
      } catch (error) {
        console.error("Error updating profile:", error.response ? error.response.data : error.message);
        toast.error("Error updating profile.");
      }
    }
    setIsEditing(!isEditing);
  };
  
  return (
    <div className="d-flex">
      <Sidebar />

      <div className="flex-grow-1 p-4" style={{ marginLeft: "20%" }}>
        {/* Add Navbar at the top using Bootstrap classes */}
        <nav className="navbar navbar-expand-lg navbar-light mb-4" style={{ backgroundColor: "#A9B5DF" }}>
          <span className="navbar-brand fw-bold fs-3 px-4" >Profile</span>
        </nav>
        <h2 className="mb-4">Profile Information</h2>
        <div className="card shadow-sm p-4 mb-4 bg-white rounded">
          <div className="row">
            <div className="col-md-6">
              <div className="form-group mb-3">
                <label>
                  <strong>First Name</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  value={profileData.firstName}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group mb-3">
                <label>
                  <strong>Last Name</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  value={profileData.lastName}
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
                  disabled
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
                  <strong>Phone</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group mb-3">
                <label>
                  <strong>Building</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="building"
                  value={profileData.building}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group mb-3">
                <label>
                  <strong>Flat No</strong>
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="flatNo"
                  value={profileData.flatNo}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group mb-3">
                <label>
                  <strong>Floor</strong>
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="floor"
                  value={profileData.floor}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group mb-3">
                <label>
                  <strong>Aadhar</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="aadhar"
                  value={profileData.aadhar}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group mb-3">
                <label>
                  <strong>Family Count</strong>
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="familyCount"
                  value={profileData.familyCount}
                  onChange={handleChange}
                  disabled={!isEditing}
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

export default MemberProfile;
