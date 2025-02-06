import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/sidebar";
import { toast } from "react-toastify";

function MemberMaintenance() {
  const [amountDue, setAmountDue] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [paymentHistory, setPaymentHistory] = useState([]);

  useEffect(() => {
    fetchMaintenanceDue();
    fetchPaymentHistory();
  }, []);

  const fetchMaintenanceDue = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:8080/get-unpaidpayment",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.length > 0) {
        const maintenanceDue = response.data[0]; // Accessing the first element of the array
        setAmountDue(maintenanceDue.amount);
        setDueDate(maintenanceDue.dueDate);
        setPaymentType(maintenanceDue.paymentType);
      }
    } catch (error) {
      console.error("Error fetching unpaid payment:", error);
      toast.error("Error fetching unpaid payment.");
    }
  };

  const fetchPaymentHistory = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8080/my-payments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPaymentHistory(response.data);
    } catch (error) {
      console.error("Error fetching payment history:", error);
      toast.error("Error fetching payment history.");
    }
  };

  const handleMakePayment = async () => {
    try {
      const token = localStorage.getItem("token");
      const paymentData = {
        amount: amountDue,
        dueDate: dueDate,
        paymentType: paymentType,
      };
      await axios.post("http://localhost:8080/make-payment", paymentData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Payment made successfully.");
      // Update state variables
      setAmountDue(0);
      setDueDate("");
      setPaymentType("");
      fetchPaymentHistory();
    } catch (error) {
      console.error("Error making payment:", error);
      toast.error("Error making payment.");
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

        <h2>Maintenance Due</h2>
        <div
          className="card mb-3"
          style={{ backgroundColor: "#ffcccc", borderColor: "#ff9999" }}
        >
          <div className="card-body">
            <h5 className="card-title">Amount Due: ₹{amountDue}</h5>
            <p className="card-text">Due Date: {dueDate}</p>
            <p className="card-text">Payment Type: {paymentType}</p>
            <button
              className="btn btn-primary"
              onClick={handleMakePayment}
              disabled={amountDue === 0}
            >
              Pay Now
            </button>
          </div>
        </div>

        <h2>Payment History</h2>
        <div className="table-responsive mb-3">
          <table className="table table-bordered">
            <thead style={{ backgroundColor: "#e3d5f5" }}>
              <tr>
                <th>Date</th>
                <th>Amount</th>
                {/* <th>Status</th> */}
                <th>Payment Type</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((payment, index) => (
                <tr key={index}>
                  <td>{payment.paymentDate}</td>
                  <td>₹{payment.amount}</td>
                  {/* <td>{payment.status}</td> */}
                  <td>{payment.paymentType}</td>
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
