import "./App.css";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Homepage from "./screens/auth_screens/Homepage";
import Register from "./screens/auth_screens/Register";
import Login from "./screens/auth_screens/Login";
import ProtectedRoute from "./screens/auth_screens/ProtectedRoute";

import MemberDashboard from "./screens/member_screens/memberDashboard";
import MemberMaintenance from "./screens/member_screens/memberMaintenance";
import MemberEventManagement from "./screens/member_screens/memberEventManagement";
import MemberComplaintsFeedbacks from "./screens/member_screens/memberComplaintsFeedbacks";
import MemberFacilityBooking from "./screens/member_screens/memberFacilityBooking";
import MemberProfile from "./screens/member_screens/memberProfile";
import MemberNotices from "./screens/member_screens/memberNotices";

import AdminDashboard from "./screens/admin_screens/adminDashboard";
import AdminMaintenance from "./screens/admin_screens/adminMaintenance";
import AdminEventManagement from "./screens/admin_screens/adminEventManagement";
import AdminComplaintsFeedbacks from "./screens/admin_screens/adminComplaintsFeedbacks";
import AdminFacilityBooking from "./screens/admin_screens/adminFacilityBooking";
import AdminProfile from "./screens/admin_screens/adminProfile";
import AdminNotices from "./screens/admin_screens/adminNotices";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signin" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/member-dashboard"
          element={
            <ProtectedRoute>
              <MemberDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/member-announcements"
          element={
            <ProtectedRoute>
              <MemberNotices />
            </ProtectedRoute>
          }
        />
        <Route
          path="/member-maintenance"
          element={
            <ProtectedRoute>
              <MemberMaintenance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/member-event-management"
          element={
            <ProtectedRoute>
              <MemberEventManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/member-complaints-feedbacks"
          element={
            <ProtectedRoute>
              <MemberComplaintsFeedbacks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/member-facility-booking"
          element={
            <ProtectedRoute>
              <MemberFacilityBooking />
            </ProtectedRoute>
          }
        />
        <Route
          path="/member-profile"
          element={
            <ProtectedRoute>
              <MemberProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-announcements"
          element={
            <ProtectedRoute>
              <AdminNotices />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-maintenance"
          element={
            <ProtectedRoute>
              <AdminMaintenance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-event-management"
          element={
            <ProtectedRoute>
              <AdminEventManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-complaints-feedbacks"
          element={
            <ProtectedRoute>
              <AdminComplaintsFeedbacks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-facility-booking"
          element={
            <ProtectedRoute>
              <AdminFacilityBooking />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-profile"
          element={
            <ProtectedRoute>
              <AdminProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
