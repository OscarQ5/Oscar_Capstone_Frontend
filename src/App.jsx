// import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar.jsx'
import './App.css'
import { useLoginDataProvider } from "./Components/LoginProvider"
import SignupPage from './Pages/SignupPage';
import EmergencyContactsPage from './Pages/EmergencyContactPage';
import MedicalHistoryPage from './Pages/MedicalHistoryPage';

function App() {

  const { setUser, setToken } = useLoginDataProvider()

  return (
    <>
      {/* <Navbar /> */}

      <Router>

        <Routes>

          {/* <Route path='/' element={<LandingPage />} /> */}
          <Route path="users/sign-up" element={<SignupPage setUser={setUser} setToken={setToken} />} />
          <Route path="users/sign-up/:user_id/contacts" element={<EmergencyContactsPage />} />
          <Route path="users/sign-up/:user_id/medical" element={<MedicalHistoryPage />} />

        </Routes>

      </Router>



    </>
  )
}

export default App
