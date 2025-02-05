import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar";
import axios from "axios";
import { toast } from "react-toastify";

function AdminFacilityBooking() {
  const [newResource, setNewResource] = useState({
    resourceType: "",
    description: "",
    capacity: "",
    bookingFee: "",
  });

  const [resources, setResources] = useState([]);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const token = localStorage.getItem("token"); // Assuming the token is stored after login
      const response = await axios.get("http://localhost:8080/all-resources", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setResources(response.data);
    } catch (error) {
      console.error("Error fetching resources:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewResource({
      ...newResource,
      [name]: value,
    });
  };

  const handleAddResource = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // Assuming the token is stored after login
      await axios.post("http://localhost:8080/add-resource", newResource, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNewResource({
        resourceType: "",
        description: "",
        capacity: "",
        bookingFee: "",
      });
      fetchResources(); // Refresh resources after adding a new one
      toast.success("Resource successfully added...!");
      console.log("Resource successfully added...!");
    } catch (error) {
      toast.error("Error adding resource...!");
      console.error("Error adding resource:", error);
    }
  };

  const handleDelete = async (resourceId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:8080/delete-resource/${resourceId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Resource Deleted Successfully");
      console.log("Resource Deleted Successfully")
      fetchResources(); 
    } catch (error) {
      toast.error("Error Deleting Resource");
      console.error("Error deleting Resource:", error);
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
            Add Facility Resource
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

        <h2>Add New Resource</h2>
        <form onSubmit={handleAddResource}>
          <div className="form-group">
            <label>Resource Type</label>
            <input
              type="text"
              className="form-control"
              name="resourceType"
              value={newResource.resourceType}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              className="form-control"
              name="description"
              value={newResource.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Capacity</label>
            <input
              type="number"
              className="form-control"
              name="capacity"
              value={newResource.capacity}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Booking Fee</label>
            <input
              type="number"
              className="form-control"
              name="bookingFee"
              value={newResource.bookingFee}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            Add Resource
          </button>
        </form>

        <h2>Existing Resources</h2>
        <div className="row">
          {resources.map((resource, index) => (
            <div className="col-md-6 mb-3" key={index}>
              <div className="card" style={{ backgroundColor: '#dfe6e9', borderColor: '#b2bec3' }}>
                <div className="card-body">
                  <h5 className="card-title fw-bold fs-4">{resource.resourceType}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">Description: {resource.description}</h6>
                  <h6 className="card-subtitle mb-2 text-muted">Capacity: {resource.capacity}</h6>
                  <h6 className="card-subtitle mb-2 text-muted">Booking Fee: {resource.bookingFee}</h6>
                  <h6 className="card-subtitle mb-2 text-muted">Availability: {resource.status}</h6>
                  <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(resource.id)}
                    >
                      Delete
                    </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminFacilityBooking;
