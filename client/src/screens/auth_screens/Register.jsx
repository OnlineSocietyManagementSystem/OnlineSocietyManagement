import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import HomeworkIcon from "@mui/icons-material/Homework";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmpassword) {
      toast.error("passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/auth/register", {
        firstName,
        lastName,
        email,
        role,
        password,
      });

      if (response.status === 201) {
        toast.success("Registration Successful!");
        navigate("/signin");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
        "Something Went Wrong, Please Try Again!"
      );
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex">
      <div className="col-md-6 d-flex align-items-center justify-content-center bg-light">
        <div className="p-5 rounded " style={{ width: "80%" }}>
          <h2 className="text-center mb-2 fw-bold">Registration Form</h2>
          <p className="mt-3">Be part of our community and transform your society management experience!</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4 mt-5">
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="firstname" className="form-label fw-bold fs-5">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstname"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter your first name"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="lastname" className="form-label fw-bold fs-5">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastname"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter your last name"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="email" className="form-label fw-bold fs-5">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="role" className="form-label fw-bold fs-5">
                    Role
                  </label>
                  <select
                    className="form-select"
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Select your role
                    </option>
                    <option value="ROLE_ADMIN">ADMIN</option>
                    <option value="ROLE_MEMBER">MEMBER</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="password" className="form-label fw-bold fs-5">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label
                    htmlFor="confirmpassword"
                    className="form-label fw-bold fs-5"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmpassword"
                    value={confirmpassword}
                    onChange={(e) => setConfirmpassword(e.target.value)}
                    placeholder="Confirm your password"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-primary w-100 fw-bold fs-5">
                Register
              </button>
              <div className="mt-3">
                <p className="fs-6">Already have an account? <Link to="/signin" className="text-primary text-decoration-none">
                  Login here.
                </Link></p>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div
        className="col-md-6 d-flex flex-column justify-content-center align-items-center text-white"
        style={{ background: "linear-gradient(to bottom,rgb(110, 83, 229), #4682B4)" }}
      >
        <HomeworkIcon style={{ fontSize: 200 }} />
        <h1 className="fw-bold">SocioHub</h1>
        <p>One Platform, Complete Society Management!</p>
      </div>
    </div>
  );
};

export default Register;
