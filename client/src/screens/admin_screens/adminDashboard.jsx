import React from "react";
import Sidebar from "../../components/sidebar";

function AdminDashboard() {
  return (
    <div className="d-flex">
      <Sidebar />

      <div className="flex-grow-1 p-4" style={{ marginLeft: "20%" }}>
        {/* Add Navbar at the top using Bootstrap classes */}
        <nav className="navbar navbar-expand-lg navbar-light mb-4" style={{ backgroundColor: "#A9B5DF" }}>
          <span className="navbar-brand fw-bold fs-3 px-4" >Dashboard</span>
        </nav>
      
        <div className="container">
          <div className="row">
            <div className="col-md-6 mb-4 text-center">
              <div className="box pt-2 fs-4 fw-bold" style={{ backgroundColor: "#f2f9fa", height: "400px" , boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
                Announcements
              </div>
            </div>
            <div className="col-md-6 mb-4 text-center">
              <div className="box pt-2 fs-4 fw-bold" style={{ backgroundColor: "#f3e3f7", height: "400px" , boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
                Maintenance
              </div>
            </div>
            <div className="col-md-6 mb-4 text-center">
              <div className="box pt-2 fs-4 fw-bold" style={{ backgroundColor: "#fff3e0", height: "400px" , boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"}}>
                Event Management
              </div>
            </div>
            <div className="col-md-6 mb-4 text-center">
              <div className="box pt-2 fs-4 fw-bold" style={{ backgroundColor: "#e9f7ec", height: "400px" , boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"}}>
                Complaints & Feedbacks
              </div>
            </div>
            <div className="col-md-6 mb-4 text-center">
              <div className="box pt-2 fs-4 fw-bold" style={{ backgroundColor: "#f9ebf9", height: "400px" , boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"}}>
                Facility Booking
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
