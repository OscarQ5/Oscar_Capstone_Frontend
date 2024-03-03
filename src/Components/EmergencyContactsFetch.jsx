import React from 'react';
import { useState, useEffect } from 'react';
import { useLoginDataProvider } from "./LoginProvider"
import '../Styles/ContactsFetchPage.css'



const EmergencyContactsFetch = () => {
    const [eContacts, setEContacts] = useState([])
    const { API, token, user } = useLoginDataProvider()


    useEffect(() => {
        fetch(`${API}/users/${user.user_id}/contacts`, {
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
                    <h2>{contact.phone_number}</h2>
                    <div>
                    <img className="editButton" src='../DarkButton.svg' alt="Edit Emergency Contact" />
                    <img className="deleteButton" src='../Anonymous_Architetto_--_Cestino_pieno.svg' alt="Delete Emergency Contact" />
                    </div>
                </div>
            ))}
        </div>
    );
};


export default EmergencyContactsFetch;