import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/sidebar";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import "./paginationStyles.css";

function AdminMaintenance() {
  const [amount, setAmount] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [payments, setPayments] = useState([]);
  const [currentPaidPage, setCurrentPaidPage] = useState(0);
  const [currentUnpaidPage, setCurrentUnpaidPage] = useState(0);
  const paymentsPerPage = 10;

  const fetchPayments = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("http://13.201.73.36:8080/all-payments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPayments(response.data);
    } catch (error) {
      console.error("Error fetching payments:", error);
      toast.error("Error fetching payments.");
    }
  };
  // Fetch all payments
  useEffect(() => {
    fetchPayments();
  }, []);

  // Handle form submission to add a new payment
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const newPayment = { amount, paymentType, dueDate };
    try {
      await axios.post("http://13.201.73.36:8080/add-payment", newPayment, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAmount("");
      setPaymentType("");
      setDueDate("");
      toast.success("Payment added successfully.");
      console.log("Payment added successfully.");
      fetchPayments(); // Refresh the payments list
    } catch (error) {
      console.error("Error adding payment:", error);
      toast.error("Error adding payment.");
    }
  };

  // Filter payments based on status
  const paidPayments = payments.filter((payment) => payment.status === "PAID");
  const unpaidPayments = payments.filter(
    (payment) => payment.status !== "PAID"
  );

  // Pagination for Paid Payments
  const paidPageCount = Math.ceil(paidPayments.length / paymentsPerPage);
  const paidPaymentsToShow = paidPayments.slice(
    currentPaidPage * paymentsPerPage,
    (currentPaidPage + 1) * paymentsPerPage
  );
  const handlePaidPageChange = ({ selected }) => {
    setCurrentPaidPage(selected);
  };

  // Pagination for Unpaid Payments
  const unpaidPageCount = Math.ceil(unpaidPayments.length / paymentsPerPage);
  const unpaidPaymentsToShow = unpaidPayments.slice(
    currentUnpaidPage * paymentsPerPage,
    (currentUnpaidPage + 1) * paymentsPerPage
  );
  const handleUnpaidPageChange = ({ selected }) => {
    setCurrentUnpaidPage(selected);
  };

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="flex-grow-1 p-4" style={{ marginLeft: "20%" }}>
        {/* Add Navbar at the top using Bootstrap classes */}
        <nav
          className="navbar navbar-expand-lg navbar-light mb-4"
          style={{ backgroundColor: "#A9B5DF" }}
        >
          <span className="navbar-brand fw-bold fs-3 px-4">Maintenance</span>
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

        {/* Paid Payments Table */}
        <div className="card mb-4">
          <div className="card-header">
            <strong>Paid Payments</strong>
          </div>
          <div className="card-body">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Amount</th>
                  <th>Payment Type</th>
                  <th>Payment Date</th>
                </tr>
              </thead>
              <tbody>
                {paidPaymentsToShow.map((payment) => (
                  <tr key={payment.id}>
                    <td>
                      {payment.firstName} {payment.lastName}
                    </td>
                    <td>{payment.amount}</td>
                    <td>{payment.paymentType}</td>
                    <td>{payment.paymentDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              pageCount={paidPageCount}
              onPageChange={handlePaidPageChange}
              containerClassName={"pagination justify-content-center"}
              activeClassName={"active"}
            />
          </div>
        </div>

        {/* Unpaid Payments Table */}
        <div className="card">
          <div className="card-header">
            <strong>Unpaid Payments</strong>
          </div>
          <div className="card-body">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Amount</th>
                  <th>Payment Type</th>
                  <th>Due Date</th>
                </tr>
              </thead>
              <tbody>
                {unpaidPaymentsToShow.map((payment) => (
                  <tr key={payment.id}>
                    <td>
                      {payment.firstName} {payment.lastName}
                    </td>
                    <td>{payment.amount}</td>
                    <td>{payment.paymentType}</td>
                    <td>{payment.dueDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              pageCount={unpaidPageCount}
              onPageChange={handleUnpaidPageChange}
              containerClassName={"pagination"}
              activeClassName={"active"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminMaintenance;
