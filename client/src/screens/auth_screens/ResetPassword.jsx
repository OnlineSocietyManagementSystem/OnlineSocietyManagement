import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function ResetPassword() {
  const { token } = useParams(); // Extract token from URL path
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        `http://13.201.73.36:8080/reset-password?token=${token}`, // Use token as request parameter
        { newPassword: password }
      );
      toast.success(response.data.message);
      navigate("/signin");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="p-5 rounded shadow-lg" style={{ width: "40%" }}>
        <h2 className="text-center mb-4 fw-bold">Reset Password</h2>
        <h5 className="text-center mb-4">Enter your new password below.</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="password" className="form-label fw-bold fs-5">
              New Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="form-label fw-bold fs-5">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary w-100">
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
