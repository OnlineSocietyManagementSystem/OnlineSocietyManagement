// import logo from './logo.svg';
import './App.css';
import Register from './screens/Register';
import Sidebar from './components/sidebar';
import Login from './screens/Login';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './screens/Dashboard';
import Announcements from './screens/Announcements';
import EventManagement from './screens/EventManagement';
import ComplaintsFeedbacks from './screens/ComplaintsFeedbacks';
import FacilityBooking from './screens/FacilityBooking';
import Profile from './screens/Profile';
import Maintenance from './screens/Maintenance';
import Homepage from './screens/Homepage';

function App() {
  return (
    <div className="App">
       <Routes>
        {/* <Route path='/' element={<Dashboard/>} /> */}

        <Route path='/' element={<Homepage/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/announcements' element={<Announcements/>} />
        <Route path='/maintenance' element={<Maintenance/>} />
        <Route path='/event-management' element={<EventManagement/>} />
        <Route path='/complaints-feedbacks' element={<ComplaintsFeedbacks/>} />
        <Route path='/facility-booking' element={<FacilityBooking/>} />
        <Route path='/profile' element={<Profile/>} />
       </Routes>
    </div>
  );
}

export default App;
