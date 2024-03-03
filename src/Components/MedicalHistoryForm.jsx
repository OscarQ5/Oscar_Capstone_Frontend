import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react'
import '../Styles/medicalHistoryForm.css'
import { useLoginDataProvider } from "./LoginProvider"

const MedicalHistoryForm = () => {

    const { API, token } = useLoginDataProvider()

    const navigate = useNavigate();

    const [medicalHistory, setMedicalHistory] = useState({

        blood_type: "",
        allergies: "",
        medication: "",
        medical_history: ""

    })

    const addMedicalHistory = () => {

        fetch(`${API}/users/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': token
            },
            body: JSON.stringify(medicalHistory),
        })
            .then(() => {
                navigate(`/users/home`);
            })
            .catch((error) => console.error("catch", error));
    };

    const handleTextChange = (event) => {
        setMedicalHistory({ ...medicalHistory, [event.target.id]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        addMedicalHistory();
       
    }

    return (
        <div className="medicalHistoryForm">

            <form onSubmit={handleSubmit} className="newForm">

                <label htmlFor="allergies">Are you allergic to anything?</label>
                <input
                    id="allergies"
                    value={medicalHistory.allergies}
                    type="text"
                    onChange={handleTextChange}
                    placeholder="ex. Bananas"
                    required
                />

                <label htmlFor="medication">Are you taking any medication? </label>
                <input
                    id="medication"
                    value={medicalHistory.medication}
                    type="text"
                    onChange={handleTextChange}
                    placeholder="ex. Albuterol"
                    required
                />


                <label htmlFor="medical_history">Any Past Medical History?</label>
                <input
                    id="medical_history"
                    value={medicalHistory.medical_history}
                    type="text"
                    onChange={handleTextChange}
                    placeholder="ex. Asthma, COPD"
                    required
                />
                <label htmlFor="blood_type">What's Your Blood Type?</label>
                <input
                    id="blood_type"
                    value={medicalHistory.blood_type}
                    type="text"
                    onChange={handleTextChange}
                    placeholder="ex. A+"
                    required
                />

                <div className="submitButton">
                 
                    <button type="submit" >Submit</button>
                </div>
            </form>

        </div>
    )
};

export default MedicalHistoryForm;