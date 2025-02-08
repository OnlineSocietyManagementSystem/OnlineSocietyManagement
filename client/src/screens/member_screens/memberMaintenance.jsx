import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/sidebar";
import { toast, ToastContainer } from "react-toastify";
import { jwtDecode } from "jwt-decode";

function MemberMaintenance() {
  const [unpaidPayments, setUnpaidPayments] = useState([]);
  const [paymentHistory, setPaymentHistory] = useState([]);

  useEffect(() => {
    fetchUnpaidPayments();
    fetchPaymentHistory();
  }, []);

  const fetchUnpaidPayments = async () => {
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
      setUnpaidPayments(response.data);
    } catch (error) {
      console.error("Error fetching unpaid payments:", error);
      toast.error("Error fetching unpaid payments.");
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

  const handleMakePayment = async (paymentId, amount) => {
    try {
      const token = localStorage.getItem("token");

      // Decode the token to extract the email
      const decodedToken = jwtDecode(token);
      const email = decodedToken.sub; // Assuming email is stored in the "sub" field

      // Make the payment
      const paymentResponse = await axios.put(
        `http://localhost:8080/make-payment/${paymentId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Payment added successfully");
      toast.success("payment added successfully");


      if (paymentResponse.status === 200) {
        // Send the receipt
        const receiptResponse = await axios.post(
          "http://localhost:8080/generate-receipt",
          {
            email: email,
            amount: amount,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (receiptResponse.status === 200) {
          toast.success("receipt sent successfully");
        } else {
          toast.error("Failed to send receipt.");
        }
      } else {
        toast.error("Failed to make payment.");
      }

      fetchUnpaidPayments(); // Refresh unpaid payments
      fetchPaymentHistory(); // Refresh payment history
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
        <nav
          className="navbar navbar-expand-lg navbar-light mb-4"
          style={{ backgroundColor: "#A9B5DF" }}
        >
          <span className="navbar-brand fw-bold fs-3 px-4">Maintenance</span>
        </nav>

        <h2>Maintenance Due</h2>
        <div className="row">
          {unpaidPayments.map((payment, index) => (
            <div className="col-md-4 mb-3" key={index}>
              <div
                className="card h-100 shadow-sm"
                style={{ backgroundColor: "#ffcccc", borderColor: "#ff9999" }}
              >
                <div className="card-body">
                  <h5 className="card-title">Amount Due: ₹{payment.amount}</h5>
                  <p className="card-text">Due Date: {payment.dueDate}</p>
                  <p className="card-text">
                    Payment Type: {payment.paymentType}
                  </p>
                  {payment.status === "UNPAID" && (
                    <button
                      className="btn btn-primary"
                      onClick={() => handleMakePayment(payment.id, payment.amount)}
                    >
                      Pay Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2>Payment History</h2>
        <div className="table-responsive mb-3">
          <table className="table table-bordered">
            <thead style={{ backgroundColor: "#e3d5f5" }}>
              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Payment Type</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory
                .filter((payment) => payment.paymentDate !== null)
                .map((payment, index) => (
                  <tr key={index}>
                    <td>{payment.paymentDate}</td>
                    <td>₹{payment.amount}</td>
                    <td>{payment.paymentType}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <ToastContainer />
      </div>
    </div>
  );
}

export default MemberMaintenance;
