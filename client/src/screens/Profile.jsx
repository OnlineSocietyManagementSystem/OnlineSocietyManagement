import React from 'react'
import Sidebar from '../components/sidebar'


function Profile() {
  return (
    <div className='d-flex'>

        <Sidebar/>

        <div className="flex-grow-1 p-4" style={{ marginLeft: "20%" }}>
            <h2>Profile</h2>
            <p>Here will be your announcements content.</p>
       </div>
        
    </div>
  )
}

export default Profile