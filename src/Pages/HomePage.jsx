import React from 'react';
import "../Styles/HomePage.css"
import { useLoginDataProvider } from "../Components/LoginProvider"
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import MedicalHistoryFetch from '../Components/MedicalHistoryFetch';

const HomePage = () => {

    const { API, token, user } = useLoginDataProvider()
    const [showMedicineCabinet, setShowMedicineCabinet] = useState(false);
    const navigate = useNavigate();

    const tellTime = () => {
        let today = new Date()
        let readableDate = today.toDateString()
        return readableDate
    }
    

    const toggleMedicineCabinet = () => {
        setShowMedicineCabinet(!showMedicineCabinet);
    };

    const goToVillages = () => {
        navigate('/users/villages');
    };

    const goToEmergencyContacts = () => {
        navigate('/users/contacts');
    };


    return (
        <div className="homePageBody">
            <div>
                <h2 className="time">{tellTime()}</h2>
            </div>
            <div className="HomePage">

                {/* <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png' /> */}

                <h2 className="userName">{user.name}</h2>

                <div className="buttons">

                    <Link to={`/users/emergency`} style={{ margin: '0', padding: '0' }}> <img className="SoSButton"  src='../emergency-health.svg' alt="Emergency Button"  />  </Link>
                    <button className="villagesButton" onClick={goToVillages}>VILLAGES</button> 
                      <button className="emergencyContactButton" onClick={goToEmergencyContacts}>EMERGENCY CONTACTS</button> 
{/* 
                    {showMedicineCabinet && <MedicalHistoryFetch setShowMedicineCabinet={setShowMedicineCabinet} />}

                    <button className="medicineCabinetButton" onClick={toggleMedicineCabinet}>MEDICAL CABINET</button> */}
                </div>
            </div>
        </div>
    );
};

export default HomePage;