import React from 'react';
import { useState, useEffect } from 'react';
import { useLoginDataProvider } from "./LoginProvider"
import '../Styles/ContactsFetchPage.css'
import { Link } from 'react-router-dom';

const EmergencyContactsFetch = () => {
    const [eContacts, setEContacts] = useState([])
    const { API, token, user } = useLoginDataProvider()

    useEffect(() => {
        fetch(`${API}/users/contacts`, {
            headers: {
                "Authorization": token
            }
        })
            .then((res) => res.json())
            .then((res) => setEContacts(() => res))

    }, [user])

    return (
        <div className='contactBody'>
            {eContacts.map((contact) => (
                <div key={contact.user_id} className="contactCard">
                    <h2>{contact.firstname}</h2>
                    <h2>{contact.lastname}</h2>

                   <div className='numberDiv'>
                    <h2>{contact.phone_number}</h2>
                    <img className="phoneButton" src='../phone_icon.svg' alt="Call Contact" />
                    <img className="messageButton" src='../message_icon.svg' alt="Message Contact" />
                    
                    </div>
                    <div>

                 <Link to={`edit/${contact.contact_id}`} >  <img className="editButton" src='../DarkButton.svg' alt="Edit Emergency Contact" /> </Link> 
                 
                    </div>
                </div>
            ))}
        </div>
    );
};

export default EmergencyContactsFetch;