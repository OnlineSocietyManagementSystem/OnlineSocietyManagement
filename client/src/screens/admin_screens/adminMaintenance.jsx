import React from 'react'
import Sidebar from '../../components/sidebar'
import maintenance from './adminMaintenance';


function AdminMaintenance() {
  return (
    <div className='d-flex'>

        <Sidebar/>

        <div className="flex-grow-1 p-4" style={{ marginLeft: "20%" }}>
            <h2>maintenance</h2>
            <p>Here will be your announcements content.</p>
       </div>
        
    </div>
  )
}

export default AdminMaintenance