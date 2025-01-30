import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar";
import axios from "axios";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

function AdminEventManagement() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [time, setTime] = useState("");
  const [events, setEvents] = useState([]);
  // const [userId, setUserId] = useState("");


  const token = localStorage.getItem("token");

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     try {
  //       const decoded = jwtDecode(token);
  //       console.log("Decoded JWT: ", decoded);
  //       setUserId(decoded.user_id);
  //     } catch (error) {
  //       console.error("Invalid token:", error);
  //     }
  //   }
  // }, []);

  // Fetch all events
  // const fetchEvents = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:8080/events");
  //     setEvents(response.data);
  //   } catch (error) {
  //     console.error("Error fetching events:", error);
  //     // toast.error("Error fetching events");
  //   }
  // };

  // useEffect(() => {
  //   fetchEvents();
  // }, []);

  // Add Event
  const handleSubmit = async (e) => {
    e.preventDefault();

    const eventData = { title, description, date, location, time, };

    try {
      const response = await axios.post(
        "http://localhost:8080/add-event",
        eventData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTitle("");
      setDescription("");
      setDate("");
      setLocation("");
      setTime("");
      toast.success("Event Added Successfully");
      // fetchEvents(); // Refresh event list
    } catch (error) {
      toast.error("Error Adding Event");
      console.error("Error adding event:", error);
    }
  };

  // Delete Event
  const handleDelete = async (eventId) => {
    try {
      await axios.delete(`http://localhost:8080/delete-event/${eventId}`);
      toast.success("Event Deleted Successfully");
      fetchEvents(); // Refresh event list
    } catch (error) {
      toast.error("Error Deleting Event");
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="flex-grow-1 p-4" style={{ marginLeft: "20%" }}>
        {/* Navbar */}
        <nav
          className="navbar navbar-expand-lg navbar-light mb-4"
          style={{ backgroundColor: "#e3d5f5" }}
        >
          <a className="navbar-brand fw-bold fs-3 px-4" href="#">
            Event Management
          </a>
        </nav>

        {/* Add New Event Form */}
        <h3>Add New Event</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="date" className="form-label">
              Date
            </label>
            <input
              type="date"
              className="form-control"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="location" className="form-label">
                Location
              </label>
              <input
                type="text"
                className="form-control"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="time" className="form-label">
                Time
              </label>
              <input
                type="time"
                className="form-control"
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Add Event
          </button>
        </form>

        {/* Display Events in a Table */}
        <h3 className="mt-4">Upcoming Events</h3>
        <table className="table table-bordered mt-3">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Description</th>
              <th>Date</th>
              <th>Location</th>
              <th>Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.length > 0 ? (
              events.map((event, index) => (
                <tr key={event.id}>
                  <td>{index + 1}</td>
                  <td>{event.title}</td>
                  <td>{event.description}</td>
                  <td>{event.date}</td>
                  <td>{event.location}</td>
                  <td>{event.time}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(event.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  No events found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminEventManagement;
