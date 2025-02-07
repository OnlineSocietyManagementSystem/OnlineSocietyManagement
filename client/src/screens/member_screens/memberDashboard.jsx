import React, { useEffect, useState } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import Sidebar from "../../components/sidebar";

function MemberDashboard() {
  const [notifications, setNotifications] = useState([]);
  const [userId, setUserId] = useState(null);

  const fetchNotifications = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:8080/pending/${id}`, {
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
      await axios.put(`http://localhost:8080/approve/${notificationId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Accepted notification:", notificationId);
      fetchNotifications(userId); // Refresh notifications after accepting
    } catch (error) {
      console.error("Error accepting notification:", error);
    }
  };

  const handleReject = async (notificationId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:8080/reject/${notificationId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Rejected notification:", notificationId);
      fetchNotifications(userId); // Refresh notifications after rejecting
    } catch (error) {
      console.error("Error rejecting notification:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const memberId = decodedToken.user_id;
      setUserId(memberId);
      fetchNotifications(memberId);
    }
  }, []);

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 p-4" style={{ marginLeft: "20%" }}>
        <nav className="navbar navbar-expand-lg navbar-light mb-4" style={{ backgroundColor: "#e3d5f5" }}>
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
                          <h5 className="card-title">{notification.guestName}</h5>
                          <p className="card-text">
                            Arrival Time: {new Date(notification.arrivalTime).toLocaleString()}
                          </p>
                          <div className="d-flex justify-content-between">
                            <button className="btn btn-success" onClick={() => handleAccept(notification.userId)}>Accept</button>
                            <button className="btn btn-danger" onClick={() => handleReject(notification.userId)}>Reject</button>
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberDashboard;
