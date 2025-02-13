import { NavLink } from "react-router-dom";
import "../App.css";
import {jwtDecode} from "jwt-decode";

function Sidebar() {
  let role = null;
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const decoded = jwtDecode(token);
      role = decoded.authorities;
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the token from localStorage
    window.location.href = "/signin"; // Redirect to the login page
  };

  return (
    <div className="d-flex">
      <div
        className="d-flex flex-column p-3 vh-100"
        style={{
          position: "fixed",
          width: "20%",
          top: "0",
          left: "0",
          backgroundColor: "#A9B5DF",
        }}
      >
        <div
          className="d-flex flex-column align-items-center"
          style={{ flex: 1 }}
        >
          <div
            className="text-center mb-2 pb-3 mt-2 d-flex align-items-center"
            style={{ borderBottom: "2px solid #23044a" }}
          >
            <h4 className="text-dark fs-1 fw-bold">SocioHub</h4>
          </div>

          <ul className="nav flex-column text-start fs-5 fw-semibold mt-3 gap-4">
            <li className="nav-item">
              <NavLink
                to={
                  role === "ROLE_MEMBER"
                    ? "/member-dashboard"
                    : "/admin-dashboard"
                }
                className={({ isActive }) =>
                  isActive ||
                  window.location.pathname === "/" ||
                  window.location.pathname === "/"
                    ? "nav-link active-link"
                    : "nav-link"
                }
              >
                Dashboard
              </NavLink>
            </li>

            {role === "ROLE_MEMBER" ? (
              <>
                <li className="nav-item">
                  <NavLink
                    to="/member-announcements"
                    className={({ isActive }) =>
                      isActive ? "nav-link active-link" : "nav-link"
                    }
                  >
                    Notices
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/member-maintenance"
                    className={({ isActive }) =>
                      isActive ? "nav-link active-link" : "nav-link"
                    }
                  >
                    Maintenance
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/member-event-management"
                    className={({ isActive }) =>
                      isActive ? "nav-link active-link" : "nav-link"
                    }
                  >
                    Event Management
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/member-complaints-feedbacks"
                    className={({ isActive }) =>
                      isActive ? "nav-link active-link" : "nav-link"
                    }
                  >
                    Complaints & Feedbacks
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/member-facility-booking"
                    className={({ isActive }) =>
                      isActive ? "nav-link active-link" : "nav-link"
                    }
                  >
                    Facility Booking
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/member-profile"
                    className={({ isActive }) =>
                      isActive ? "nav-link active-link" : "nav-link"
                    }
                  >
                    Profile
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink
                    to="/admin-announcements"
                    className={({ isActive }) =>
                      isActive ? "nav-link active-link" : "nav-link"
                    }
                  >
                    Notices
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/admin-maintenance"
                    className={({ isActive }) =>
                      isActive ? "nav-link active-link" : "nav-link"
                    }
                  >
                    Maintenance
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/admin-event-management"
                    className={({ isActive }) =>
                      isActive ? "nav-link active-link" : "nav-link"
                    }
                  >
                    Event Management
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/admin-complaints-feedbacks"
                    className={({ isActive }) =>
                      isActive ? "nav-link active-link" : "nav-link"
                    }
                  >
                    Complaints & Feedbacks
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/admin-facility-booking"
                    className={({ isActive }) =>
                      isActive ? "nav-link active-link" : "nav-link"
                    }
                  >
                    Facility Booking
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/admin-profile"
                    className={({ isActive }) =>
                      isActive ? "nav-link active-link" : "nav-link"
                    }
                  >
                    Profile
                  </NavLink>
                </li>
              </> )}
          </ul>
          <div>
            <button onClick={handleLogout} className="btn btn-danger mt-4">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
