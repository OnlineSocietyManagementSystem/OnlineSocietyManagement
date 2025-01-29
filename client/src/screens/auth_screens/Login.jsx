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

        try {
            const response = await axios.post("http://localhost:8080/auth/signin" , {
                email,
                password,
            });

      toast.success("login successful");
      // console.log("Response : ", response.data);
      // console.log(response.data.jwt);
      const token = response.data.jwt;

      localStorage.setItem("token", token);

      if (token) {
        // console.log("in token block");

        const decoded = jwtDecode(token);
        // console.log("in token block");

        console.log("decoded jwt : ", decoded);
        const role = decoded.authorities;

        if(role == "ROLE_MEMBER")
          navigate("/member-dashboard");
        else
          navigate("/admin-dashboard");
      }

    } catch (error) {
      const errorMessage = error.response?.data?.message || "login failed";
      toast.error(errorMessage);
      console.error("Error : ", errorMessage);
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-secondary">
      <div
        className="bg-light p-5 rounded shadow"
        style={{ width: "60%", height: "70%" }}
      >
        <h2 className="text-center mb-4 fw-bold">Login Form</h2>

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
            <button type="submit" className="btn btn-primary w-40 ">
              Login
            </button>
            <div className="mt-3 ">
              <Link
                to="/register"
                className="text-primary text-decoration-none"
              >
                Register here
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
