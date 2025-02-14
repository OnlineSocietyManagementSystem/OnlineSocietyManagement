import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Email validation
    // const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // if (!emailPattern.test(email)) {
    //   toast.error("Please enter a valid email address!");
    //   return;
    // }
  
    // Password validation
    // if (password.length < 6) {
    //   toast.error("Password must be at least 6 characters long!");
    //   return;
    // }
  
    // if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    //   toast.error("Password should include at least one special character!");
    //   return;
    // }
  
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}auth/signin`, {
        email,
        password,
      });
  
      console.log(response);
  
      toast.success("Login successful");
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
      if (error.response?.status === 401) {
        toast.error("Incorrect password. Please try again.");
      } else if (error.response?.status === 400) {
        toast.error("Please enter a valid email address.");
      } else {
        const errorMessage = error.response?.data?.message || "Login failed";
        toast.error(errorMessage);
      }
      console.error("Error : ", error.response || error.message);
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

                <p>
                  Forgot your password? {" "}
                  <Link to="/forgot-password" className="text-primary text-decoration-none">
                    Reset here
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
