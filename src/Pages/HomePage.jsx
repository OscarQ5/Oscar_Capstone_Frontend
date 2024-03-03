import React from 'react';
import "../Styles/HomePage.css"
import { useLoginDataProvider } from "../Components/LoginProvider"

const HomePage = () => {

    const { API, token, user } = useLoginDataProvider()

    return (
        <div className="HomePage">

            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png' />

            <h1>{user.name}</h1>

            <div className="buttons">

                <button className="emergencyContactButton">EMERGENCY CONTACTS</button>

                <button className="sosButton">⛑️</button>

                <button className="medicineCabinetButton">MEDICINE CABINET</button>
            </div>
        </div>
    );
};

export default HomePage;