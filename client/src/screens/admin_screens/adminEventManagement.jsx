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
  const [showForm, setShowForm] = useState(false);

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
      setShowForm(false); // Hide form after submission
    } catch (error) {
      toast.error("Error Adding Event");
      console.error("Error adding event:", error);
    }
  };

  const handleDelete = async (eventId) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/delete-event/${eventId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("response: ", response);
      toast.success("Event Deleted Successfully");
      console.log("Event deleted successfully");
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
        <nav
          className="navbar navbar-expand-lg navbar-light mb-4"
          style={{ backgroundColor: "#A9B5DF" }}
        >
          <span className="navbar-brand fw-bold fs-3 px-4">
            Event Management
          </span>
        </nav>

        {showForm ? (
          <div className="card mb-4">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Description</label>
                    <input
                      type="text"
                      className="form-control"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-4">
                    <label className="form-label">Date</label>
                    <input
                      type="date"
                      className="form-control"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Location</label>
                    <input
                      type="text"
                      className="form-control"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Time</label>
                    <input
                      type="time"
                      className="form-control"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="d-flex ">
                  <button type="submit" className="btn btn-primary me-3">
                    Add Event
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger "
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <button
              className="btn btn-primary mb-4"
              onClick={() => setShowForm(true)}
            >
              Click here to add a new event
            </button>
          </div>
        )}

        {/* <h3 className="mt-4">Upcoming Events</h3> */}
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {events.length > 0 ? (
            events.map((event, index) => (
              <div key={event.id} className="col">
                <div className="card border-0 shadow">
                  <div
                    className="card-header fs-4"
                    style={{
                      backgroundColor: "#2D336B",
                      color: "#FFF2F2",
                      fontWeight: "bold",
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <span>{event.title}</span>
                    </div>
                  </div>
                  <div className="card-body">
                    <p className="card-text">
                      <strong>Description: </strong> {event.description}
                    </p>
                  </div>
                  <div className="card-footer ">
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="card-text">
                        <strong>Date:</strong> {event.date}
                      </p>
                      <p className="card-text">
                        <strong>Location:</strong> {event.location}
                      </p>
                      <p className="card-text">
                        <strong>Time:</strong> {event.time}
                      </p>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(event.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="alert alert-info text-center" role="alert">
              No events found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminEventManagement;
