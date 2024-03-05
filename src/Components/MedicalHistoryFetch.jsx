import React from 'react';
import { useState, useEffect } from 'react';
import { useLoginDataProvider } from "./LoginProvider"

const MedicalHistoryFetch = () => {

    const [medHistory, setMedHistory] = useState()

    const { API, token, user, med } = useLoginDataProvider()


    useEffect(() => {
        fetch(`${API}/users/${user.user_id}/medical/${med.medical_id}`, {
            headers: {
                "Authorization": token
            }
        })
            .then((res) => res.json())
            .then((res) => setMedHistory(() => res))

    }, [user])

    console.log(medHistory, user)

    return (
        <div className='contactBody'>
        
            <div key={medHistory.id} className="medHistoryCard">

                <h2>{medHistory.allergies}</h2>
                <h2>{medHistory.blood_type}</h2>
                <h2>{medHistory.medical_history}</h2>
                <div>
                <img className="editButton" src='../DarkButton.svg' alt="Edit Emergency Contact" />
                <img className="deleteButton" src='../Anonymous_Architetto_--_Cestino_pieno.svg' alt="Delete Emergency Contact" />
                </div>
            </div>
     
    </div>
    );
};

export default MedicalHistoryFetch;