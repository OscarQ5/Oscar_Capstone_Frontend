// import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar.jsx'
import FriesNavbar from './Components/FriesNavbar.jsx';
import './App.css'
import { useLoginDataProvider } from "./Components/LoginProvider"
import LandingPage from './Pages/LandingPage.jsx';
// import Login from './Pages/Login.jsx';
import SignupPage from './Pages/SignupPage';
import EmergencyContactsPage from './Pages/EmergencyContactPage';
import MedicalHistoryPage from './Pages/MedicalHistoryPage';
import HomePage from './Pages/HomePage.jsx';
import ProtectedRoute from './Components/ProtecteRoutes.jsx';
import ContactsFetchPage from './Pages/ContactsFetchPage.jsx';
import EditContactForm from './Pages/EditContactForm.jsx';
import NewContactForm from './Pages/NewContactForm.jsx';

function App() {

  const { setUser, setToken, user, token } = useLoginDataProvider()

  return (
    <>

      <Router>
        <FriesNavbar />
        {/* <Navbar /> */}

        <Routes>

          <Route path='/' element={<LandingPage />} />
          <Route path="users/sign-up" element={<SignupPage setUser={setUser} setToken={setToken} />} />
          {/* <Route path='users/login' element={<Login />} /> */}
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


          <Route path="users/contacts"
            element={
              <ProtectedRoute
                element={ContactsFetchPage}
                isAuthenticated={!!user && !!token}
                user={user}
                token={token}
              />
            }
          />


          <Route path="users/contacts/edit/:contact_id"
            element={
              <ProtectedRoute
                element={EditContactForm}
                isAuthenticated={!!user && !!token}
                user={user}
                token={token}
              />
            }
          />

          <Route path="users/contacts/new"
            element={
              <ProtectedRoute
                element={NewContactForm}
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
