import React from 'react'
import Sidebar from '../components/sidebar'


function EventManagement() {
  return (
    <div className='d-flex'>

        <Sidebar/>

        <div className="flex-grow-1 p-4" style={{ marginLeft: "20%" }}>
            <h2>Event Management</h2>
            <p>Here will be your announcements content.</p>
       </div>
        
    </div>
  )
}

export default EventManagement