// import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar.jsx'
import './App.css'
import { useLoginDataProvider } from "./Components/LoginProvider"
import SignupPage from './Pages/SignupPage';
import EmergencyContactsPage from './Pages/EmergencyContactPage';
import MedicalHistoryPage from './Pages/MedicalHistoryPage';
import HomePage from './Pages/HomePage.jsx';
import ProtectedRoute from './Pages/ProtecteRoutes.jsx';

function App() {

  const { setUser, setToken, user, token } = useLoginDataProvider()

  return (
    <>
      {/* <Navbar /> */}

      <Router>

        <Routes>

          {/* <Route path='/' element={<LandingPage />} /> */}
          <Route path="users/sign-up" element={<SignupPage setUser={setUser} setToken={setToken} />} />
          <Route path="users/sign-up/:user_id/contacts" element={<EmergencyContactsPage />} />
          <Route path="users/sign-up/:user_id/medical" element={<MedicalHistoryPage />} />

          <Route path="users/home"
          element={
            <ProtectedRoute
              element={HomePage}
              isAuthenticated={!!user && !!token}
              user={user}
              token={token}
            />
          }
        />
        
        </Routes>

      </Router>



    </>
  )
}

export default App
