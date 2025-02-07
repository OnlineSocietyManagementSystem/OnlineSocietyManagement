import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../../components/sidebar";
import { toast } from "react-toastify";

function AdminMaintenance() {
  const [amount, setAmount] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [dueDate, setDueDate] = useState("");

  // Handle form submission to add a new payment
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const newPayment = { amount, paymentType, dueDate };
    try {
      await axios.post("http://localhost:8080/add-payment", newPayment, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAmount("");
      setPaymentType("");
      setDueDate("");
      toast.success("Payment added successfully.");
      console.log("Payment added successfully.");
    } catch (error) {
      console.error("Error adding payment:", error);
      toast.error("Error adding payment.");
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="flex-grow-1 p-4" style={{ marginLeft: "20%" }}>
        {/* Add Navbar at the top using Bootstrap classes */}
        <nav className="navbar navbar-expand-lg navbar-light mb-4" style={{ backgroundColor: "#e3d5f5" }}>
          <span className="navbar-brand fw-bold fs-3 px-4" >Maintainance</span>
        </nav>

        <h2>Maintenance Payment Status</h2>

        {/* Payment Form */}
        <div className="card mb-4">
          <div className="card-header">
            <strong>Add New Payment</strong>
          </div>
          <div className="card-body">
            <form onSubmit={handleFormSubmit}>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">Amount</label>
                  <input
                    type="number"
                    className="form-control"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Payment Type</label>
                  <input
                    type="text"
                    className="form-control"
                    value={paymentType}
                    onChange={(e) => setPaymentType(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Due Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    required
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                Add Payment
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminMaintenance;
