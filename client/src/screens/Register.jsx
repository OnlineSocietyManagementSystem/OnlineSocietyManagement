import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

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
    }

    try {
      const response = await axios.post("http://localhost:8080/member/register", {
        firstName,
        lastName,
        email,
        role,
        password,
      });

      if (response.status === 201) {
        toast.success("Registration Successful!");
        console.log(response);
        console.log(response.data.timestamp);
        console.log(response.data.message);

        navigate("/login");
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
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-secondary">
      <div
        className="bg-light p-5 rounded shadow"
        style={{ width: "60%", height: "70%" }}
      >
        <h2 className="text-center mb-4 fw-bold">Registration Form</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
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
                  <option value="ADMIN">ADMIN</option>
                  <option value="MEMBER">MEMBER</option>
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
            <button type="submit" className="btn btn-primary w-40 ">
              Register
            </button>
            <div className="mt-3 ">
              <Link to="/login" className="text-primary text-decoration-none">
                Already have an account? Login here.
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
