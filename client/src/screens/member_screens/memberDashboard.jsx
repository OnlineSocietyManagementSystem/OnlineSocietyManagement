import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Sidebar from "../../components/sidebar";

function MemberDashboard() {
  const [notifications, setNotifications] = useState([]);
  const [userId, setUserId] = useState(null);

  const fetchNotifications = async (id) => {
    try {
      const response = await axios.get("/pending/${id}");
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

  // const handleAccept = async (notificationId) => {
  //   try {
  //     // Add your accept notification API call here
  //     console.log("Accepted notification:", notificationId);
  //   } catch (error) {
  //     console.error("Error accepting notification:", error);
  //   }
  // };

  // const handleReject = async (notificationId) => {
  //   try {
  //     // Add your reject notification API call here
  //     console.log("Rejected notification:", notificationId);
  //   } catch (error) {
  //     console.error("Error rejecting notification:", error);
  //   }
  // };

  useEffect(() => {
    const token = localStorage.getItem("token"); // Adjust the key name as needed
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
      const memberId = decodedToken.user_id; // Adjust the key name based on your token structure
      setUserId(memberId);
      console.log(memberId);
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
                <ul className="list-group">
                  {notifications.map((notification, index) => (
                    <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
                      {notification.guestName} is arriving at {notification.arrivalTime}. Status: {notification.status}
                      <div>
                        <button className="btn btn-success mr-2" onClick={() => handleAccept(notification.id)}>Accept</button>
                        <button className="btn btn-danger" onClick={() => handleReject(notification.id)}>Reject</button>
                      </div>
                    </li>
                  ))}
                </ul>
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
