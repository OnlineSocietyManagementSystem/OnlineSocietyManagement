import './App.css';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Homepage from './screens/auth_screens/Homepage';
import Register from './screens/auth_screens/Register';
import Login from './screens/auth_screens/Login';

import MemberDashboard from './screens/member_screens/memberDashboard';
import MemberMaintenance from './screens/member_screens/memberMaintenance';
import MemberEventManagement from './screens/member_screens/memberEventManagement';
import MemberComplaintsFeedbacks from './screens/member_screens/memberComplaintsFeedbacks';
import MemberFacilityBooking from './screens/member_screens/memberFacilityBooking';
import MemberProfile from './screens/member_screens/memberProfile';

import AdminDashboard from './screens/admin_screens/adminDashboard';
import AdminMaintenance from './screens/admin_screens/adminMaintenance';
import AdminEventManagement from './screens/admin_screens/adminEventManagement';
import AdminComplaintsFeedbacks from './screens/admin_screens/adminComplaintsFeedbacks';
import AdminFacilityBooking from './screens/admin_screens/adminFacilityBooking';
import AdminProfile from './screens/admin_screens/adminProfile';
import AdminNotices from './screens/admin_screens/adminNotices';
import MemberNotices from './screens/member_screens/memberNotices';

import ProtectedRoute from './screens/auth_screens/ProtectedRoute'; // Ensure correct import path
import GuardPage from './screens/auth_screens/GuardPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/guestpage" element={<GuardPage />} />
        

        <Route path="/member-dashboard" element={<ProtectedRoute element={MemberDashboard} />} />
        <Route path="/member-announcements" element={<ProtectedRoute element={MemberNotices} />} />
        <Route path="/member-maintenance" element={<ProtectedRoute element={MemberMaintenance} />} />
        <Route path="/member-event-management" element={<ProtectedRoute element={MemberEventManagement} />} />
        <Route path="/member-complaints-feedbacks" element={<ProtectedRoute element={MemberComplaintsFeedbacks} />} />
        <Route path="/member-facility-booking" element={<ProtectedRoute element={MemberFacilityBooking} />} />
        <Route path="/member-profile" element={<ProtectedRoute element={MemberProfile} />} />

        <Route path="/admin-dashboard" element={<ProtectedRoute element={AdminDashboard} />} />
        <Route path="/admin-announcements" element={<ProtectedRoute element={AdminNotices} />} />
        <Route path="/admin-maintenance" element={<ProtectedRoute element={AdminMaintenance} />} />
        <Route path="/admin-event-management" element={<ProtectedRoute element={AdminEventManagement} />} />
        <Route path="/admin-complaints-feedbacks" element={<ProtectedRoute element={AdminComplaintsFeedbacks} />} />
        <Route path="/admin-facility-booking" element={<ProtectedRoute element={AdminFacilityBooking} />} />
        <Route path="/admin-profile" element={<ProtectedRoute element={AdminProfile} />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
