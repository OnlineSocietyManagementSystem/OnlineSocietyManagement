import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar";
import axios from "axios";
import { toast } from "react-toastify";

function AdminEventManagement() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [time, setTime] = useState("");
  const [events, setEvents] = useState([]);

  const token = localStorage.getItem("token");

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:8080/all-events");
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const eventData = { title, description, date, location, time };

    try {
      await axios.post("http://localhost:8080/add-event", eventData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTitle("");
      setDescription("");
      setDate("");
      setLocation("");
      setTime("");
      toast.success("Event Added Successfully");
      fetchEvents();
    } catch (error) {
      toast.error("Error Adding Event");
      console.error("Error adding event:", error);
    }
  };

  const handleDelete = async (eventId) => {
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

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 p-4" style={{ marginLeft: "20%" }}>
        <nav className="navbar navbar-expand-lg navbar-light mb-4" style={{ backgroundColor: "#e3d5f5" }}>
          <span className="navbar-brand fw-bold fs-3 px-4" >Event Management</span>
        </nav>

        <h3 className="mb-3">Add New Event</h3>
        <form onSubmit={handleSubmit} className="bg-white p-4 shadow-sm rounded">
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Title</label>
              <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Description</label>
              <input type="text" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} required />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-4">
              <label className="form-label">Date</label>
              <input type="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} required />
            </div>
            <div className="col-md-4">
              <label className="form-label">Location</label>
              <input type="text" className="form-control" value={location} onChange={(e) => setLocation(e.target.value)} required />
            </div>
            <div className="col-md-4">
              <label className="form-label">Time</label>
              <input type="time" className="form-control" value={time} onChange={(e) => setTime(e.target.value)} required />
            </div>
          </div>

          <button type="submit" className="btn btn-primary">Add Event</button>
        </form>

        <h3 className="mt-4">Upcoming Events</h3>
        <div className="row mt-3">
          {events.length > 0 ? (
            events.map((event, index) => (
              <div className="col-md-4 mb-3" key={event.id}>
                <div className="card shadow-sm h-100">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h5 className="card-title fw-bold text-primary">{event.title}</h5>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(event.id)}>Delete</button>
                    </div>
                    <p className="card-text"><strong>Description:</strong> {event.description}</p>
                    <p className="card-text"><strong>Date:</strong> {event.date}</p>
                    <p className="card-text"><strong>Location:</strong> {event.location}</p>
                    <p className="card-text"><strong>Time:</strong> {event.time}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No events found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminEventManagement;
