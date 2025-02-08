import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import HomeworkIcon from "@mui/icons-material/Homework";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/auth/signin", {
        email,
        password,
      });

      toast.success("login successful");
      const token = response.data.jwt;

      localStorage.setItem("token", token);

      if (token) {
        const decoded = jwtDecode(token);
        const role = decoded.authorities;

        if (role === "ROLE_MEMBER") {
          navigate("/member-dashboard");
        } else {
          navigate("/admin-dashboard");
        }
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "login failed";
      toast.error(errorMessage);
      console.error("Error : ", errorMessage);
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex">
      <div
        className="col-md-6 d-flex flex-column justify-content-center align-items-center text-white"
        style={{ background: "linear-gradient(to bottom,rgb(110, 83, 229), #4682B4)" }}
      >
        <HomeworkIcon style={{ fontSize: 200 }} />
        <h1 className="fw-bold">SocioHub</h1>
        <p>One Platform, Complete Society Management!</p>
      </div>
      <div className="col-md-6 d-flex align-items-center justify-content-center bg-light">
        <div className="p-5 rounded " style={{ width: "80%" }}>
          <h2 className="text-center mb-4 fw-bold">Login Form</h2>
          <h5 className="text-center mb-4">
            Welcome back! Please login to your account.
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

            <div className="mb-4">
              <label htmlFor="password" className="form-label fw-bold fs-5">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>
              <div className="mt-3">
                <p>
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="text-primary text-decoration-none"
                  >
                    Register now
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

export default Login;
