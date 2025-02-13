import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Sidebar from "../../components/sidebar";
import { toast } from "react-toastify";

function MemberDashboard() {
  const [notifications, setNotifications] = useState([]);
  const [userId, setUserId] = useState(null);
  const [latestNotice, setLatestNotice] = useState(null);
  const [latestEvent, setLatestEvent] = useState(null);
  const [bookedResources, setBookedResources] = useState([]);


  const fetchNotifications = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://13.201.73.36:8080/pending/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("API Response:", response.data);
      if (Array.isArray(response.data)) {
        setNotifications(response.data);
      } else {
        console.error("Expected an array but received:", response.data);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const handleAccept = async (notificationId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://13.201.73.36:8080/approve/${notificationId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      // console.log("Accepted notification:", notificationId);
      fetchNotifications(userId); // Refresh notifications after accepting
    } catch (error) {
      console.error("Error accepting notification:", error);
    }
  };

  const handleReject = async (notificationId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://13.201.73.36:8080/reject/${notificationId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      // console.log("Rejected notification:", notificationId);
      fetchNotifications(userId); // Refresh notifications after rejecting
    } catch (error) {
      console.error("Error rejecting notification:", error);
    }
  };

  const fetchNotices = async () => {
    try {
      const response = await axios.get("http://13.201.73.36:8080/all-notices");
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
      const response = await axios.get("http://13.201.73.36:8080/all-events");
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

  const fetchBookedResources = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://13.201.73.36:8080/all-bookings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log(response);
      setBookedResources(response.data);
    } catch (error) {
      console.error("Error fetching booked resources:", error);
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://13.201.73.36:8080/cancel-booking/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Booking deleted successfully");
      fetchBookedResources();
    } catch (error) {
      toast.error("Error deleting booking");
      console.error("Error deleting booking:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const memberId = decodedToken.user_id;
      setUserId(memberId);
      fetchNotifications(memberId);

      fetchNotices();
      fetchEvents();
      fetchBookedResources();
    }
  }, []);

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 p-4" style={{ marginLeft: "20%" }}>
        <nav
          className="navbar navbar-expand-lg navbar-light mb-4"
          style={{ backgroundColor: "#A9B5DF" }}
        >
          <span className="navbar-brand fw-bold fs-3 px-4">Dashboard</span>
        </nav>

        <div className="container">
          <div className="row mt-4">
            <div className="col-12">
              <h4>Pending Notifications</h4>
              {Array.isArray(notifications) && notifications.length > 0 ? (
                <div className="row">
                  {notifications.map((notification, index) => (
                    <div className="col-md-4 mb-4" key={index}>
                      <div className="card">
                        <div className="card-body">
                          <h5 className="card-title">
                            {notification.guestName}
                          </h5>
                          <p className="card-text">
                            Arrival Time:{" "}
                            {new Date(
                              notification.arrivalTime
                            ).toLocaleString()}
                          </p>
                          <div className="d-flex justify-content-between">
                            <button
                              className="btn btn-success"
                              onClick={() => handleAccept(notification.userId)}
                            >
                              Accept
                            </button>
                            <button
                              className="btn btn-danger"
                              onClick={() => handleReject(notification.userId)}
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No pending notifications available.</p>
              )}
            </div>

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
                      <h5 className="card-title fw-bold">
                        {latestNotice.title}
                      </h5>
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
                      <h5 className="card-title fw-bold">
                        {latestEvent.title}
                      </h5>
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
                      </div>
                    </div>
                  </div>
                ) : (
                  <p>No events available.</p>
                )}
              </div>
            </div>

            <h2 className="mb-0">Booked Resources</h2>
            <div className="row row-cols-1 row-cols-md-2  mt-2">
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberDashboard;
