import React from "react";
import Sidebar from "../../components/sidebar";

// Function to format the date
const formatDate = (startDate, endDate) => {
  const options = { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' };
  const start = new Date(startDate).toLocaleString('en-US', options).replace(',', '');
  const end = new Date(endDate).toLocaleString('en-US', options).replace(',', '');
  return `${start} - ${end}`;
}

function AdminFacilityBooking() {
  // Sample static data
  const facilityBookings = [
    { resource: 'Hall', bookerName: 'John Doe', phone: '1234567890', startDate: '2025-02-01T12:00', endDate: '2025-02-02T12:00' },
    { resource: 'Swimming Pool', bookerName: 'Jane Smith', phone: '0987654321', startDate: '2025-02-05T12:00', endDate: '2025-02-06T12:00' },
    { resource: 'Clubhouse', bookerName: 'Alice Johnson', phone: '1122334455', startDate: '2025-03-01T12:00', endDate: '2025-03-02T12:00' },
    { resource: 'Tennis Court', bookerName: 'Bob Brown', phone: '5566778899', startDate: '2025-04-01T12:00', endDate: '2025-04-02T12:00' },
    { resource: 'Gym', bookerName: 'Charlie Davis', phone: '6677889900', startDate: '2025-05-01T12:00', endDate: '2025-05-02T12:00' },
    // Add more bookings as needed
  ];

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

        <h2>Booked Resources</h2>
        <div className="row">
          {facilityBookings.map((booking, index) => (
            <div className="col-md-6 mb-3" key={index}>
              <div className="card" style={{ backgroundColor: '#dfe6e9', borderColor: '#b2bec3' }}>
                <div className="card-body">
                  <h5 className="card-title fw-bold fs-4">{booking.resource}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">Booked by: {booking.bookerName}</h6>
                  <h6 className="card-subtitle mb-2 text-muted">Phone: {booking.phone}</h6>
                  <p className="card-text">Duration: {formatDate(booking.startDate, booking.endDate)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminFacilityBooking;
