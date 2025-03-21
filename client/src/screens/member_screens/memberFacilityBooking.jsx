import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar";
import axios from "axios";
import { toast } from "react-toastify";

function MemberFacilityBooking() {
  const [resources, setResources] = useState([]);
  const [bookedResources, setBookedResources] = useState([]);
  const [selectedResource, setSelectedResource] = useState(null);
  const [bookingDate, setBookingDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [purpose, setPurpose] = useState("");
  const [comments, setComments] = useState("");

  useEffect(() => {
    fetchResources();
    fetchBookedResources();
  }, []);

  const fetchResources = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:8080/all-resources`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResources(response.data);
    } catch (error) {
      console.error("Error fetching resources:", error);
    }
  };

  const fetchBookedResources = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:8080/all-bookings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response);
      setBookedResources(response.data);
    } catch (error) {
      console.error("Error fetching booked resources:", error);
    }
  };

  const handleBookNow = (resource) => {
    if (resource.status === "Unavailable") return;
    if (selectedResource && selectedResource.id === resource.id) {
      setSelectedResource(null);
    } else {
      setSelectedResource(resource);
    }
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const bookingData = {
        resourceId: selectedResource.id,
        bookingDate,
        startTime,
        endTime,
        purpose,
        comments,
      };
      console.log("resourceName : ", selectedResource.resourceType);
      await axios.post(`http://localhost:8080/add-booking`, bookingData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Booking successful");
      setSelectedResource(null);
      fetchResources();
      fetchBookedResources();
    } catch (error) {
      toast.error("Error booking resource");
      console.error("Error booking resource:", error);
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8080/cancel-booking/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Booking deleted successfully");
      fetchBookedResources();
      fetchResources();
    } catch (error) {
      toast.error("Error deleting booking");
      console.error("Error deleting booking:", error);
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

        <h2>Resources</h2>
        <div className="row row-cols-1 row-cols-md-2 g-4 mb-4">
          {Array.isArray(resources) &&
            resources.map((resource, index) => (
              <div key={index} className="col">
                <div className="card border-0 shadow">
                  <div
                    className="card-header fs-4"
                    style={{
                      backgroundColor:
                        resource.status === "Unavailable"
                          ? "#2D336B"
                          : "#A9B5DF",
                      color: "2D336B",
                      fontWeight: "bold",
                      cursor:
                        resource.status !== "Unavailable"
                          ? "pointer"
                          : "not-allowed",
                    }}
                    onClick={() => handleBookNow(resource)}
                  >
                    {resource.resourceType}
                  </div>
                  <div className="card-body">
                    <p className="card-text text-dark mb-1">
                      Description: {resource.description}
                    </p>
                    <p className="card-text text-dark mb-1">
                      Capacity: {resource.capacity}
                    </p>
                    <p className="card-text text-dark mb-0">
                      Booking Fee: {resource.bookingFee}
                    </p>
                    
                  </div>
                  <div className="card-footer">
                    <div className="d-flex justify-content-between align-items-center">
                    <p className="card-text text-dark fs-5 fw-bold">
                      Availability: {resource.status}
                    </p>
                      {resource.status !== "Unavailable" && (
                        <button
                          className="btn btn-primary"
                          onClick={() => handleBookNow(resource)}
                        >
                          Book Now
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        <h2>Booked Resources</h2>
        <div className="row row-cols-1 row-cols-md-2 g-4 mb-4 mt-2">
          {Array.isArray(bookedResources) &&
            bookedResources
              .filter((booking) => booking.status !== "CANCELLED")
              .map((booking, index) => (
                <div key={index} className="col">
                  <div className="card border-0 shadow ">
                    <div
                      className="card-header fs-5"
                      style={{
                        backgroundColor: "#2D336B",
                        color: "rgb(255, 255, 255)",
                        fontWeight: "bold",
                      }}
                    >
                      {booking.resourceType}
                    </div>
                    <div className="card-body">
                      <p className="card-text text-dark mb-1">
                        Comments: {booking.comments}
                      </p>

                      <p className="card-text text-dark mb-1">
                        Date: {booking.bookingDate}
                      </p>
                      <p className="card-text text-dark mb-0">
                        Time: {booking.startTime} - {booking.endTime}
                      </p>
                    </div>
                    <div className="card-footer fs-5">
                      <div className="d-flex justify-content-between align-items-center">
                        <p className="card-text fw-bold">
                          Status: {booking.status}
                        </p>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDeleteBooking(booking.id)}
                        >
                          Cancel Booking
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
        </div>

        {selectedResource && (
          <div className="card p-4 mt-4">
            <h3>Book Resource: {selectedResource.resourceType}</h3>
            <form onSubmit={handleBookingSubmit}>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="bookingDate" className="form-label">
                    Booking Date
                  </label>
                  <input
                    type="date"
                    id="bookingDate"
                    className="form-control"
                    onChange={(e) => setBookingDate(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="purpose" className="form-label">
                    Purpose
                  </label>
                  <input
                    type="text"
                    id="purpose"
                    className="form-control"
                    placeholder="Purpose"
                    onChange={(e) => setPurpose(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="startTime" className="form-label">
                    Start Time
                  </label>
                  <input
                    type="time"
                    id="startTime"
                    className="form-control"
                    onChange={(e) => setStartTime(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="endTime" className="form-label">
                    End Time
                  </label>
                  <input
                    type="time"
                    id="endTime"
                    className="form-control"
                    onChange={(e) => setEndTime(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="comments" className="form-label">
                  Comment
                </label>
                <textarea
                  id="comments"
                  className="form-control"
                  placeholder="Comment"
                  onChange={(e) => setComments(e.target.value)}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                Confirm Booking
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default MemberFacilityBooking;
