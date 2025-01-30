import React from "react";
import Sidebar from "../../components/sidebar";

function AdminMaintenance() {
  // Sample static data
  const maintenanceData = [
    { name: "John Doe", flatNo: "101", mobileNo: "1234567890", status: "Paid" },
    {
      name: "Jane Smith",
      flatNo: "102",
      mobileNo: "0987654321",
      status: "Unpaid",
    },
    {
      name: "Alice Johnson",
      flatNo: "103",
      mobileNo: "1122334455",
      status: "Paid",
    },
    {
      name: "Bob Brown",
      flatNo: "104",
      mobileNo: "5566778899",
      status: "Unpaid",
    },
    // Add more rows as needed
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

        <h2>Maintenance Payment Status</h2>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead style={{ backgroundColor: "#e3d5f5" }}>
              <tr>
                <th scope="col">Member Name</th>
                <th scope="col">Flat No</th>
                <th scope="col">Mobile No</th>
                <th scope="col">Payment Status</th>
              </tr>
            </thead>
            <tbody>
              {maintenanceData.map((data, index) => (
                <tr
                  key={index}
                  className={
                    data.status === "Paid" ? "table-success" : "table-danger"
                  }
                >
                  <td>{data.name}</td>
                  <td>{data.flatNo}</td>
                  <td>{data.mobileNo}</td>
                  <td>{data.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminMaintenance;
