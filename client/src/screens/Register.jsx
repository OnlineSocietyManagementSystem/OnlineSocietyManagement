import { useState } from 'react'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import registerImage from '../images/register.jpg'


  const Register = () => {
    return (
      <div className="container-fluid vh-100 d-flex align-items-center justify-content-center">
        <div className="row w-75 shadow-lg p-3 bg-body rounded ">
          {/* Left Section */}
          <div className="col-md-6 d-flex flex-column justify-content-center align-items-center left-section">
            <div className="illustration mb-3">
              <img
                src={registerImage}
                alt="Illustration"
                className="img-fluid"
              />
            </div>
            
          </div>
  
          {/* Right Section */}
          <div className="col-md-6 p-5 right-section background-color rounded ">
            <h2 className="mb-4 text-center fw-bold text-white">Welcome to SOCIOHUB</h2>
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label text-white">
                  Full Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter your name"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label text-white">
                  Email Address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label text-white">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter your password"
                />
              </div>
              <div className='text-center'>
                <button type="submit" className="btn btn-primary w-40 text-white">
                  Register
                </button>                
              </div>
            </form>

            <div className="text-center mt-3 text-white">
              <p>
                Already have an account? <a href="/login">Sign In</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };


export default Register
