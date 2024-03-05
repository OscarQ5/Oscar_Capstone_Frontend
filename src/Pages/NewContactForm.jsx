import React from 'react'
import { useState } from 'react'
import { useNavigate, Link } from "react-router-dom";
import '../Styles/EmergencyContactsForm.css'
import { useLoginDataProvider } from "../Components/LoginProvider"

export default function NewContactForm() {

    const { API, user, token } = useLoginDataProvider()

    const navigate = useNavigate();

    const [contact, setContact] = useState({

        firstname: "",
        lastname: "",
        phone_number: ""

    })

    const addEmergencyContact = () => {

        fetch(`${API}/users/contacts`, {
            method: "POST",
            body: JSON.stringify(contact),
            headers: {
                "Content-Type": "application/json",
                'Authorization': token
            },
        })
            .then(() => {
                navigate(`/users/contacts`);
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


    return (
        <div className="emergencyContactForm">

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

                    <button type="submit">Submit</button>
                </div>
            </form>

        </div>
    )
}
