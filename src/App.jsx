// import { useState } from 'react'
import { BrowserRouter as Routes, Router, Route } from 'react-router-dom';
import Navbar from './Components/Navbar.jsx'
import './App.css'

function App() {


  return (
    <>
      <Navbar />
      <div>
        <Router>
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/users/sign-up' element={< Signup />} />
            {/* <Route path='/users/login' element={< />} /> */}
            {/* <Route path='/' element={< />} / > */}
            {/* <Route path="users/:user_id/contacts/sign-up" element={<EmergencyContactsPage />} />
            <Route path="users/:user_id/contacts/sign-up2" element={<MedicalHistoryPage />} /> */}
          </Routes>
        </Router>

      </div>
    </>
  )
}

export default App
