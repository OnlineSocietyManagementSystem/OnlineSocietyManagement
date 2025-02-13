import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/forgot-password", { email });
      toast.success(response.data);
      setEmail("");
    } catch (error) {
      const errorMessage = error.response?.data || "Something went wrong";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex">
      <div
        className="col-md-6 d-flex flex-column justify-content-center align-items-center text-white"
        style={{ background: "linear-gradient(to bottom,rgb(110, 83, 229), #4682B4)" }}
      >
        <h1 className="fw-bold">SocioHub</h1>
        <p>One Platform, Complete Society Management!</p>
      </div>
      <div className="col-md-6 d-flex align-items-center justify-content-center bg-light">
        <div className="p-5 rounded" style={{ width: "80%" }}>
          <h2 className="text-center mb-4 fw-bold">Forgot Password</h2>
          <h5 className="text-center mb-4">
            Enter your email to receive a password reset link.
          </h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="form-label fw-bold fs-5">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary w-100">
                Send Reset Link
              </button>
              <div className="mt-3">
                <p>
                  Remembered your password? {" "}
                  <Link to="/signin" className="text-primary text-decoration-none">
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
