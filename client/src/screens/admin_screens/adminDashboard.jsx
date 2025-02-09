import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/sidebar";

function AdminDashboard() {
  const [latestNotice, setLatestNotice] = useState(null);
  const [latestEvent, setLatestEvent] = useState(null);
  const [latestFeedback, setLatestFeedback] = useState(null);
  const [latestComplaint, setLatestComplaint] = useState(null);
  const [bookings, setBookings] = useState([]);

  const token = localStorage.getItem("token");

  const fetchNotices = async () => {
    try {
      const response = await axios.get("http://localhost:8080/all-notices");
      const notices = response.data;

      // Sort notices by updatedOn date in descending order
      notices.sort((a, b) => new Date(b.updatedOn) - new Date(a.updatedOn));

      if (notices.length > 0) {
        setLatestNotice(notices[0]);
      }
    } catch (error) {
      console.error("Error fetching notices:", error);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:8080/all-events");
      const events = response.data;

      // Sort events by updatedOn date in descending order
      events.sort((a, b) => new Date(b.updatedOn) - new Date(a.updatedOn));

      if (events.length > 0) {
        setLatestEvent(events[0]);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get("http://localhost:8080/all-feedbacks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const feedbacks = response.data;

      // Sort feedbacks by updatedOn date in descending order
      feedbacks.sort((a, b) => new Date(b.updatedOn) - new Date(a.updatedOn));

      if (feedbacks.length > 0) {
        setLatestFeedback(feedbacks[0]);
      }
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  };

  const fetchComplaints = async () => {
    try {
      const response = await axios.get("http://localhost:8080/all-complaints", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const complaints = response.data;

      // Sort complaints by creationDate in descending order
      complaints.sort(
        (a, b) => new Date(b.creationDate) - new Date(a.creationDate)
      );

      if (complaints.length > 0) {
        setLatestComplaint(complaints[0]);
      }
    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
  };

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token"); // Assuming the token is stored after login
      const response = await axios.get("http://localhost:8080/all-bookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await axios.delete(`http://localhost:8080/delete-event/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Event Deleted Successfully");
      fetchEvents();
    } catch (error) {
      toast.error("Error Deleting Event");
      console.error("Error deleting event:", error);
    }
  };

  const handleDeleteNotice = async (noticeId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:8080/delete-notice/${noticeId}`, {
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

  useEffect(() => {
    fetchNotices();
    fetchEvents();
    fetchFeedbacks();
    fetchComplaints();
    fetchBookings();
  }, []);

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="flex-grow-1 p-4" style={{ marginLeft: "20%" }}>
        {/* Add Navbar at the top using Bootstrap classes */}
        <nav
          className="navbar navbar-expand-lg navbar-light mb-4"
          style={{ backgroundColor: "#A9B5DF" }}
        >
          <span className="navbar-brand fw-bold fs-3 px-4">Dashboard</span>
        </nav>

        <div className="container">
          <h2>Notice and Event</h2>
          <div className="row">
            {/* latest notice */}
            <div className="col-md-6 mb-4">
              {latestNotice ? (
                <div className="card border-0 shadow">
                  <div
                    className="card-header"
                    style={{
                      backgroundColor: "#2D336B",
                      color: "rgb(255, 255, 255)",
                      fontWeight: "bold",
                    }}
                  >
                    <h5 className="card-title fw-bold">{latestNotice.title}</h5>
                  </div>
                  <div className="card-body">
                    <p className="card-text">{latestNotice.description}</p>
                  </div>

                  <div className="card-footer text-muted">
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="card-text">
                        <small className="text-muted">
                          Date: {latestNotice.createdOn}
                        </small>
                      </p>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteNotice(latestNotice.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <p>No notices available.</p>
              )}
            </div>

            {/* latest event */}
            <div className="col-md-6 mb-4">
              {latestEvent ? (
                <div className="card border-0 shadow">
                  <div
                    className="card-header"
                    style={{
                      backgroundColor: "#2D336B",
                      color: "rgb(255, 255, 255)",
                      fontWeight: "bold",
                    }}
                  >
                    <h5 className="card-title fw-bold">{latestEvent.title}</h5>
                  </div>
                  <div className="card-body">
                    <p className="card-text">{latestEvent.description}</p>
                  </div>
                  <div className="card-footer">
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="card-text">
                        <small className="text-muted">
                          Date: {latestEvent.date}
                        </small>
                      </p>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteEvent(latestEvent.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <p>No events available.</p>
              )}
            </div>
          </div>

          <h2>Feedback and complaint</h2>
          <div className="row">
            {/* latest feedback */}
            <div className="col-md-6 mb-4">
              {latestFeedback ? (
                <div className="card border-0 shadow">
                  <div
                    className="card-header"
                    style={{
                      backgroundColor: "#2D336B",
                      color: "rgb(255, 255, 255)",
                      fontWeight: "bold",
                    }}
                  >
                    <h5 className="card-title fw-bold">Latest Feedback</h5>
                  </div>
                  <div className="card-body">
                    <p className="card-text">{latestFeedback.content}</p>
                    <p className="card-text">
                      <small className="text-muted">
                        Date: {latestFeedback.createdOn}
                      </small>
                    </p>
                  </div>
                </div>
              ) : (
                <p>No feedbacks available.</p>
              )}
            </div>

            {/* latest complaint */}
            <div className="col-md-6 mb-4">
              {latestComplaint ? (
                <div className="card border-0 shadow">
                  <div
                    className="card-header"
                    style={{
                      backgroundColor: "#2D336B",
                      color: "rgb(255, 255, 255)",
                      fontWeight: "bold",
                    }}
                  >
                    <h5 className="card-title fw-bold">Latest Complaint</h5>
                  </div>
                  <div className="card-body">
                    <p className="card-text">{latestComplaint.description}</p>
                    <p className="card-text">
                      <small className="text-muted">
                        Date: {latestComplaint.creationDate}
                      </small>
                    </p>
                  </div>
                </div>
              ) : (
                <p>No complaints available.</p>
              )}
            </div>

            <h2 className=" mb-0">All Bookings</h2>
            <div className="row row-cols-1 row-cols-md-2 mt-2">
              {Array.isArray(bookings) &&
                bookings
                  .filter(
                    (booking) =>
                      booking.status === "PENDING" ||
                      booking.status === "CONFIRMED"
                  )
                  .map((booking, index) => (
                    <div key={index} className="col">
                      <div className="card border-0 shadow">
                        <div
                          className="card-header fw-bold"
                          style={{
                            backgroundColor:
                              booking.status === "PENDING"
                                ? "#A9B5DF"
                                : "#2D336B",
                            color:
                              booking.status === "PENDING"
                                ? "#000000"
                                : "rgb(255, 255, 255)",
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
      </div>
    </div>
  );
}

export default AdminDashboard;
