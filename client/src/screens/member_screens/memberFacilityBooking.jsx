import React, { useState } from "react";
import Sidebar from "../../components/sidebar";

function MemberFacilityBooking() {
  const [selectedFacility, setSelectedFacility] = useState("");
  const [bookerName, setBookerName] = useState("");
  const [phone, setPhone] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Sample static data for available facilities
  const availableFacilities = [
    { name: 'Hall' },
    { name: 'Swimming Pool' },
    { name: 'Clubhouse' },
    { name: 'Tennis Court' },
    { name: 'Gym' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking Details:", { selectedFacility, bookerName, phone, startDate, endDate });
    // Reset form fields
    setSelectedFacility("");
    setBookerName("");
    setPhone("");
    setStartDate("");
    setEndDate("");
  };

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="flex-grow-1 p-4" style={{ marginLeft: "20%" }}>
        {/* Add Navbar at the top using Bootstrap classes */}
        <nav
          className="navbar navbar-expand-lg navbar-light mb-4"
          style={{ backgroundColor: "#e3d5f5" }}
        >
          <a className="navbar-brand fw-bold fs-3 px-4" href="#">
          Facility Booking
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </nav>

        <h2>Available Facilities</h2>
        <div className="row mb-3">
          {availableFacilities.map((facility, index) => (
            <div className="col-md-4 mb-3" key={index}>
              <div className="card" style={{ backgroundColor: '#f8f9fa', borderColor: '#dee2e6' }}>
                <div className="card-body">
                  <h5 className="card-title">{facility.name}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2>Book a Facility</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="selectedFacility" className="form-label">Facility</label>
            <select 
              className="form-control" 
              id="selectedFacility" 
              value={selectedFacility} 
              onChange={(e) => setSelectedFacility(e.target.value)} 
              required
            >
              <option value="">Select a Facility</option>
              {availableFacilities.map((facility, index) => (
                <option key={index} value={facility.name}>{facility.name}</option>
              ))}
            </select>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="bookerName" className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                id="bookerName"
                value={bookerName}
                onChange={(e) => setBookerName(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="phone" className="form-label">Phone</label>
              <input
                type="tel"
                className="form-control"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="startDate" className="form-label">Start Date and Time</label>
              <input
                type="datetime-local"
                className="form-control"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="endDate" className="form-label">End Date and Time</label>
              <input
                type="datetime-local"
                className="form-control"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Book Facility</button>
        </form>
      </div>
    </div>
  );
}

export default MemberFacilityBooking;
