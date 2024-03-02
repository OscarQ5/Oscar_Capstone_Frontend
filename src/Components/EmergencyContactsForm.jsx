import React from 'react'
import { useState } from 'react'
import { useNavigate, Link } from "react-router-dom";
import '../Styles/EmergencyContactsForm.css'

// const API = import.meta.env.VITE_API_URL;

import { useLoginDataProvider } from "./LoginProvider"



export default function EmergencyContactsForm() {

    const { API, user } = useLoginDataProvider()

    const navigate = useNavigate();

    const [contact, setContact] = useState({

        firstname: "",
        lastname: "",
        phone_number: ""

    })

    const [successMessage, setSuccessMessage] = useState("");

    const addEmergencyContact = () => {

        fetch(`${API}/users/${user.user_id}/contacts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(contact),
        })
            .then(() => {
                navigate(`/users/sign-up/${user.user_id}/medical`);
            })
            .catch((error) => console.error("catch", error));
    };

    const addMoreEmergencyContact = () => {
        fetch(`${API}/users/${user.user_id}/contacts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(contact),
        })
            .catch((error) => console.error("catch", error));
    };

    const handleTextChange = (event) => {
        setContact({ ...contact, [event.target.id]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        addEmergencyContact();

    }

    const handleAddMoreSubmit = (event) => {
        event.preventDefault();
        addMoreEmergencyContact();
        setSuccessMessage(`Successfully added: ${contact.firstname} ${contact.lastname} `);

        setTimeout(() => {
            setSuccessMessage("");
        }, 2000);
        setContact({
            firstname: "",
            lastname: "",
            phone_number: "",
        });

    };

    return (
        <div className="emergencyContactForm">

            {successMessage && <div className="successMessage">{successMessage}</div>}

            <form onSubmit={handleSubmit} className="newForm">

                <label htmlFor="firstname">First Name:</label>
                <input
                    id="firstname"
                    value={contact.firstname}
                    type="text"
                    onChange={handleTextChange}
                    placeholder="ex. Jane"
                    required
                />

                <label htmlFor="lastname">Last Name:</label>
                <input
                    id="lastname"
                    value={contact.lastname}
                    type="text"
                    onChange={handleTextChange}
                    placeholder="ex. Smith"
                    required
                />

                <label htmlFor="phone_number">Phone Number:</label>
                <input
                    id="phone_number"
                    value={contact.phone_number}
                    type="tel"
                    onChange={handleTextChange}
                    placeholder="ex. 919-222-2222"
                    required
                />


                <div className="submitButton-EC">

                    <button onClick={handleAddMoreSubmit}>Add </button>

                    <button type="submit">Next</button>
                </div>
            </form>

        </div>
    )
}
