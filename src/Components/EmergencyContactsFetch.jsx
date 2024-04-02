import React from 'react';
import { useState, useEffect } from 'react';
import { useLoginDataProvider } from "./LoginProvider"
import '../Styles/ContactsFetchPage.css'
import { Link } from 'react-router-dom';
import { formatPhoneNumber } from 'react-phone-number-input';

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
                    <h2 className="firstNameC">{contact.firstname}</h2>
                    <h2 className="lastNameC">{contact.lastname}</h2>

                    <div className='numberDiv'>
                      
                        <h2>{formatPhoneNumber(contact.phone_number)}</h2>
                       
                        
                        <a href={`sms:${contact.phone_number}`}><img className="messageButton" src='../message_icon.svg' alt="Message Contact" /></a>
                    </div>

                    <div>
                        <Link to={`edit/${contact.contact_id}`} ><img className="editButton" src='../DarkButton.svg' alt="Edit Emergency Contact" /></Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default EmergencyContactsFetch;
