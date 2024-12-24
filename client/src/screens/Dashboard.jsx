import React from 'react'
import Sidebar from '../components/sidebar'


function Dashboard() {
  return (
    <div className='d-flex'>

        <Sidebar/>

        <div className="flex-grow-1 p-4" style={{ marginLeft: "20%" }}>
            <h2>Dashboard</h2>
            <p>Here will be your announcements content.</p>
            <p>Added line to test from testBranch</p>
       </div>
        
    </div>
  )
}

export default Dashboard
