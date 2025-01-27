import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import registerImage from "../images/register.jpg";

const Register = () => {
  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-secondary">
      <div
        className="bg-light p-5 rounded shadow"
        style={{ width: "60%", height: "70%" }}
      >
        <h2 className="text-center mb-4 fw-bold">Registration Form</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              Phone Number
            </label>
            <input
              type="tel"
              className="form-control"
              id="phone"
              placeholder="Enter your phone number"
            />
          </div>
          <div>
            <button type="submit" className="btn btn-primary w-30 text-center">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
