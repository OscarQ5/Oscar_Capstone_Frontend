import React from 'react'
import { useState } from 'react'
import { useNavigate} from "react-router-dom";
import '../Styles/EmergencyContactsForm.css'
import { useLoginDataProvider } from "../Components/LoginProvider"
import PhoneInput from 'react-phone-number-input';

export default function NewContactForm() {

    const { API, token } = useLoginDataProvider()
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
        const { id, value } = event.target;

        if (id === "phone_number") {
            setContact({ ...contact, phone_number: value });
        } else {
            setContact({ ...contact, [id]: value });
        }
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
                <PhoneInput
                    id="phone_number"
                    value={contact.phone_number}
                    onChange={(value) => setContact({ ...contact, phone_number: value })}
                    placeholder="ex. 111-222-3333"
                    defaultCountry="US"
                    required
                />

                <div className="submitButton-EC">
                    <button type="submit">Submit</button>
                </div>
            </form>

        </div>
    )
}
