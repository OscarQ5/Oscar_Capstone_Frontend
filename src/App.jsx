// import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar.jsx'
import './App.css'

function App() {


  return (
    <>
      <Navbar />
      <div>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/users/sign-up' element={< Signup />} />
          {/* <Route path='/users/login' element={< />} /> */}
          {/* <Route path='/' element={< />} / > */}
          {/* <Route path="users/:user_id/contacts/sign-up" element={<EmergencyContactsPage />} />
            <Route path="users/:user_id/contacts/sign-up2" element={<MedicalHistoryPage />} /> */}
        </Routes>
      </div>
    </>
  )
}

export default App
