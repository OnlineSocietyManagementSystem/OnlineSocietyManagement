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
          <div className="mb-4">
            <div className="row">
              <div className="col-md-6">
                <label htmlFor="firstname" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstname"
                  placeholder="Enter your first name"
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="lastname" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastname"
                  placeholder="Enter your last name"
                />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <div className="row">
              <div className="col-md-6">
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

              <div className="col-md-6">
                <label htmlFor="role" className="form-label">
                  Role
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="role"
                  placeholder="Enter your role"
                />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <div className="row">
              <div className="col-md-6">
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
              <div className="col-md-6">
                <label htmlFor="confirmpassword" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmpassword"
                  placeholder="Confirm your password"
                />
              </div>
            </div>
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary w-40 ">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
