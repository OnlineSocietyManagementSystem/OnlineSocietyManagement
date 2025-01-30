// import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Homepage from './screens/auth_screens/Homepage';
import Register from './screens/auth_screens/Register';
import Login from './screens/auth_screens/Login';

import MemberDashboard from './screens/member_screens/memberDashboard';
import MemberAnnouncements from './screens/member_screens/memberAnnouncements';
import MemberMaintenance from './screens/member_screens/memberMaintenance';
import MemberEventManagement from './screens/member_screens/memberEventManagement';
import MemberComplaintsFeedbacks from './screens/member_screens/memberComplaintsFeedbacks';
import MemberFacilityBooking from './screens/member_screens/memberFacilityBooking';
import MemberProfile from './screens/member_screens/memberProfile';

import AdminDashboard from './screens/admin_screens/adminDashboard';
import AdminAnnouncements from './screens/admin_screens/adminAnnouncements';
import AdminMaintenance from './screens/admin_screens/adminMaintenance';
import AdminEventManagement from './screens/admin_screens/adminEventManagement';
import AdminComplaintsFeedbacks from './screens/admin_screens/adminComplaintsFeedbacks';
import AdminFacilityBooking from './screens/admin_screens/adminFacilityBooking';
import AdminProfile from './screens/admin_screens/adminProfile';



function App() {
  return (
    <div className="App">
       <Routes>

        <Route path='/' element={<Homepage/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/signin' element={<Login/>} />

        <Route path='/member-dashboard' element={<MemberDashboard/>} />
        <Route path='/member-announcements' element={<MemberAnnouncements/>} />
        <Route path='/member-maintenance' element={<MemberMaintenance/>} />
        <Route path='/member-event-management' element={<MemberEventManagement/>} />
        <Route path='/member-complaints-feedbacks' element={<MemberComplaintsFeedbacks/>} />
        <Route path='/member-facility-booking' element={<MemberFacilityBooking/>} />
        <Route path='/member-profile' element={<MemberProfile/>} />

        <Route path='/admin-dashboard' element={<AdminDashboard/>} />
        <Route path='/admin-announcements' element={<AdminAnnouncements/>} />
        <Route path='/admin-maintenance' element={<AdminMaintenance/>} />
        <Route path='/admin-event-management' element={<AdminEventManagement/>} />
        <Route path='/admin-complaints-feedbacks' element={<AdminComplaintsFeedbacks/>} />
        <Route path='/admin-facility-booking' element={<AdminFacilityBooking/>} />
        <Route path='/admin-profile' element={<AdminProfile/>} />

       </Routes>
       
       <ToastContainer/>
    </div>
  );
}

export default App;
