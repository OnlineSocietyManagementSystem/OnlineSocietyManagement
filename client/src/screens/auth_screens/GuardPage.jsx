import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function GuardPage() {
  const [members, setMembers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    userId: "",
    guestName: "",
    arrivalTime: "",
    securityGuardId: "",
  });
  const [notification, setNotification] = useState(null);

  const fetchMembers = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/all-members`);
      setMembers(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("error fetching members", error);
    }
  };

  const fetchNotification = async (notificationId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/notify-guard/${notificationId}`
      );
      setNotification(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("error fetching notification", error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendNotification = (memberId) => {
    setFormData({ ...formData, userId: memberId });
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8080/notify-member`, formData);
      const notificationId = response.data.notificationId;
      console.log(notificationId);

      // Store the notificationId in local storage
      localStorage.setItem("notificationId", notificationId);

      setShowForm(false);
      toast.success("Message sent successfully.. wait for response");
      fetchNotification(notificationId);
    } catch (error) {
      console.error("error sending notification", error);
    }
  };

  useEffect(() => {
    fetchMembers();

    // Retrieve the notificationId from local storage and fetch notification details
    const storedNotificationId = localStorage.getItem("notificationId");
    if (storedNotificationId) {
      fetchNotification(storedNotificationId);
    }
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Members List</h2>
      <div className="table-responsive">
        <table
          className="table table-bordered table-hover"
          style={{
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <thead className="thead-light" style={{ backgroundColor: "#f8f9fa" }}>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Building</th>
              <th>Flat No</th>
              <th>Floor</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, index) => (
              <tr key={index}>
                <td>{member.firstName}</td>
                <td>{member.lastName}</td>
                <td>{member.email}</td>
                <td>{member.building}</td>
                <td>{member.flatNo}</td>
                <td>{member.floor}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleSendNotification(member.id)}
                    style={{ backgroundColor: "#007bff", borderColor: "#007bff" }}
                  >
                    Send Notification
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showForm && (
        <div
          className="mt-4 p-4"
          style={{
            backgroundColor: "#f8f9fa",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h4>Send Notification</h4>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="guestName">Guest Name</label>
              <input
                type="text"
                className="form-control"
                id="guestName"
                name="guestName"
                value={formData.guestName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="arrivalTime">Arrival Time</label>
              <input
                type="datetime-local"
                className="form-control"
                id="arrivalTime"
                name="arrivalTime"
                value={formData.arrivalTime}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="securityGuardId">Security Guard ID</label>
              <input
                type="text"
                className="form-control"
                id="securityGuardId"
                name="securityGuardId"
                value={formData.securityGuardId}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-success mt-3">
              Send
            </button>
          </form>
        </div>
      )}

      {notification && (
        <div
          className="mt-4 p-4"
          style={{
            backgroundColor: "#f8f9fa",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h4>Notification Details</h4>
          <p className="fs-5 fw-bold">{notification}</p>
        </div>
      )}
    </div>
  );
}

export default GuardPage;
