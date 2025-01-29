import { NavLink } from "react-router-dom";
import '../App.css';

function Sidebar() {
    return (
        <div className="d-flex">
            <div className="d-flex flex-column p-3 vh-100" style={{ position: "fixed", width: "20%", top: "0", left: "0", backgroundColor: "#e3d5f5" }}>
                <div className="d-flex flex-column align-items-center" style={{ flex: 1 }}>
                    <div className="text-center mb-2 pb-3 mt-2" style={{ borderBottom: '2px solid #23044a' }}>
                        <h4 className="text-dark fs-2 fw-bold ">SocioHub</h4>
                    </div>

                    <ul className="nav flex-column text-start fs-5 fw-semibold mt-3 gap-4">
                        <li className="nav-item">
                            <NavLink
                                to="/member-dashboard"
                                className={({ isActive }) => (isActive || window.location.pathname === "/" || window.location.pathname === "/member-dashboard" ? "nav-link active-link" : "nav-link")}
                            >
                                Dashboard
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/member-announcements"
                                className={({ isActive }) => (isActive ? "nav-link active-link" : "nav-link")}
                            >
                                Announcements
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/member-maintenance"
                                className={({ isActive }) => (isActive ? "nav-link active-link" : "nav-link")}
                            >
                                Maintenance
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/member-event-management"
                                className={({ isActive }) => (isActive ? "nav-link active-link" : "nav-link")}
                            >
                                Event Management
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/member-complaints-feedbacks"
                                className={({ isActive }) => (isActive ? "nav-link active-link" : "nav-link")}
                            >
                                Complaints & Feedbacks
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/member-facility-booking"
                                className={({ isActive }) => (isActive ? "nav-link active-link" : "nav-link")}
                            >
                                Facility Booking
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/member-profile"
                                className={({ isActive }) => (isActive ? "nav-link active-link" : "nav-link")}
                            >
                                Profile
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
