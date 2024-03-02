import React from 'react';
import MedicalHistoryForm from '../Components/MedicalHistoryForm';
import { useState } from 'react';
import { useLoginDataProvider } from "../Components/LoginProvider"

const MedicalHistoryPage = () => {
    const { API, user } = useLoginDataProvider()

    const [showBlurb, setShowBlurb] = useState(false)

    const toggleBlurb = () => {
        setShowBlurb(!showBlurb);
    };

    return (
        <div>
            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png' />

            <h1>{user.name}</h1>

            <h2>Medical Questionnaire <span onClick={toggleBlurb}>?</span></h2>

            {showBlurb && (
                <div className="blurb">
                    <p>

                        While it's not required,
                        this optional medical form can be extremely helpful in the event of an emergency to have
                        your medical information on hand for medical personnel.
                    </p>
                </div>
            )}
            <MedicalHistoryForm />
            <button className="skip">Skip</button>
        </div>
    );
};

export default MedicalHistoryPage;