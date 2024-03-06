import React from 'react';
import "../Styles/HomePage.css"
import { useLoginDataProvider } from "../Components/LoginProvider"
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import MedicalHistoryFetch from '../Components/MedicalHistoryFetch';

const HomePage = () => {

    const { API, token, user } = useLoginDataProvider()
    const [showMedicineCabinet, setShowMedicineCabinet] = useState(false);

    const tellTime = () => {
        let today = new Date()
        let readableDate = today.toDateString()
        return readableDate
    }

    const toggleMedicineCabinet = () => {
        setShowMedicineCabinet(!showMedicineCabinet);
    };

    return (
        <>
            <div>
                <h2 className="time">{tellTime()}</h2>
            </div>
            <div className="HomePage">

                <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png' />

                <h1 className="userName">{user.name}</h1>

                <div className="buttons">

                    <Link to={`/users/contacts`} style={{ margin: '0', padding: '0' }}>  <button className="emergencyContactButton">EMERGENCY CONTACTS</button> </Link>

                    <button className="sosButton"> <img className="emergencyButton" src='../emergency-health.svg' alt="Emergency Button" />   </button>

                    {showMedicineCabinet && <MedicalHistoryFetch setShowMedicineCabinet={setShowMedicineCabinet}/>}

                    <button className="medicineCabinetButton" onClick={toggleMedicineCabinet}>MEDICINE CABINET</button>
                </div>
            </div>
        </>
    );
};

export default HomePage;