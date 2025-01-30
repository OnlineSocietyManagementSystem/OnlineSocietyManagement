import React from "react";
import Sidebar from "../../components/sidebar";

function MemberMaintenance() {
  // Sample static data
  const maintenanceDue = { amount: 5000, dueDate: '2025-02-15' };
  const paymentHistory = [
    { date: '2025-01-01', amount: 5000, status: 'Paid' },
    { date: '2024-12-01', amount: 5000, status: 'Paid' },
    { date: '2024-11-01', amount: 5000, status: 'Paid' }
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
          Maintenance
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

        <h2>Maintenance Due</h2>
        <div className="card mb-3" style={{ backgroundColor: '#ffcccc', borderColor: '#ff9999' }}>
          <div className="card-body">
            <h5 className="card-title">Amount Due: ₹{maintenanceDue.amount}</h5>
            <p className="card-text">Due Date: {maintenanceDue.dueDate}</p>
            <button className="btn btn-primary">Pay Now</button>
          </div>
        </div>

        <h2>Payment History</h2>
        <div className="table-responsive mb-3">
          <table className="table table-bordered ">
            <thead style={{ backgroundColor: '#e3d5f5' }}>
              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((payment, index) => (
                <tr key={index}>
                  <td>{payment.date}</td>
                  <td>₹{payment.amount}</td>
                  <td>{payment.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MemberMaintenance;
