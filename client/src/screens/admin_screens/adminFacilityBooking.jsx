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
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchResources();
    fetchBookings();
  }, []);

  const fetchResources = async () => {
    try {
      const token = localStorage.getItem("token"); // Assuming the token is stored after login
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}all-resources`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setResources(response.data);
    } catch (error) {
      console.error("Error fetching resources:", error);
    }
  };

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token"); // Assuming the token is stored after login
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}all-bookings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
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
      await axios.post(`${import.meta.env.VITE_BASE_URL}add-resource`, newResource, {
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
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}delete-resource/${resourceId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Resource Deleted Successfully");
      console.log("Resource Deleted Successfully");
      fetchResources();
    } catch (error) {
      toast.error("Error Deleting Resource");
      console.error("Error deleting Resource:", error);
    }
  };

  // API to confirm a booking
  const confirmBooking = async (bookingId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `${import.meta.env.VITE_BASE_URL}confirm-booking/${bookingId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Booking Confirmed Successfully");
      console.log("Booking Confirmed Successfully");
      fetchBookings();
    } catch (error) {
      toast.error("Error Confirming Booking");
      console.error("Error confirming booking:", error);
    }
  };

  // API to cancel a booking
  const cancelBooking = async (bookingId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}cancel-booking/${bookingId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Booking Cancelled Successfully");
      console.log("Booking Cancelled Successfully");
      fetchBookings();
    } catch (error) {
      toast.error("Error Cancelling Booking");
      console.error("Error cancelling booking:", error);
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
          <span className="navbar-brand fw-bold fs-3 px-4">
            Facility Booking
          </span>
        </nav>

        <h2>Add New Resource</h2>
        <form onSubmit={handleAddResource}>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group mb-3">
                <label>
                  <strong>Resource Type</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="resourceType"
                  value={newResource.resourceType}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group mb-3">
                <label>
                  <strong>Description</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="description"
                  value={newResource.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group mb-2">
                <label>
                  <strong>Capacity</strong>
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="capacity"
                  value={newResource.capacity}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group mb-2">
                <label>
                  <strong>Booking Fee</strong>
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="bookingFee"
                  value={newResource.bookingFee}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary mt-2 mb-3">
            Add Resource
          </button>
        </form>

        <h2 className="mt-2 mb-3">Existing Resources</h2>
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {Array.isArray(resources) &&
            resources.map((resource, index) => (
              <div key={index} className="col">
                <div className="card border-0 shadow">
                  <div
                    className="card-header"
                    style={{
                      backgroundColor: "#2D336B",
                      color: "rgb(255, 255, 255)",
                      fontWeight: "bold",
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">{resource.resourceType}</h5>
                    </div>
                  </div>
                  <div className="card-body">
                    <p className="card-text text-dark mb-1">
                      <strong>Description:</strong> {resource.description}
                    </p>
                    <p className="card-text text-dark mb-1">
                      <strong>Capacity:</strong> {resource.capacity}
                    </p>
                    <p className="card-text text-dark mb-0">
                      <strong>Booking Fee:</strong> ₹{resource.bookingFee}
                    </p>
                  </div>
                  <div className="card-footer">
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="fs-5">
                        <strong>Availability:</strong> {resource.status}
                      </p>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(resource.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        <h2 className="mt-3 mb-3">All Bookings</h2>
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {Array.isArray(bookings) &&
            bookings
              .filter(
                (booking) =>
                  booking.status === "PENDING" || booking.status === "CONFIRMED"
              )
              .map((booking, index) => (
                <div key={index} className="col">
                  <div className="card border-0 shadow">
                    <div
                      className="card-header fw-bold"
                      style={{
                        backgroundColor:
                          booking.status === "PENDING" ? "#A9B5DF" : "#2D336B",
                        color: booking.status === "PENDING" ? "#000000" : "rgb(255, 255, 255)",
                        fontWeight: "bold",
                      }}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">{booking.resourceType}</h5>
                        <span
                          className={`badge ${
                            booking.status === "PENDING"
                              ? "bg-warning"
                              : "bg-info"
                          } text-dark`}
                        >
                          {booking.status}
                        </span>
                      </div>
                    </div>
                    <div className="card-body">
                      <h6 className="card-text text-dark">
                        Booker Name: {booking.firstName} {booking.lastName}
                      </h6>
                      <h6 className="card-text text-dark">
                        Booking Date: {booking.bookingDate}
                      </h6>
                      <h6 className="card-text text-dark">
                        Start Time: {booking.startTime}
                      </h6>
                      <h6 className="card-text text-dark">
                        End Time: {booking.endTime}
                      </h6>
                    </div>
                    <div className="card-footer text-muted">
                      {booking.status === "PENDING" && (
                        <div>
                          <button
                            className="btn btn-success btn-sm me-2"
                            onClick={() => confirmBooking(booking.id)}
                          >
                            Confirm
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => cancelBooking(booking.id)}
                          >
                            Cancel
                          </button>
                        </div>
                      )}
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
