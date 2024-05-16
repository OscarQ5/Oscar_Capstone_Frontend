import React, { useState, useEffect } from 'react';
import { useLoginDataProvider } from "../Components/LoginProvider";
import EditMedicalHistory from "./EditMedicalHistory";
import '../Styles/MedicalHistoryFetch.css'

const MedicalHistoryFetch = () => {
    const { API, token } = useLoginDataProvider();
    const [medHistory, setMedHistory] = useState([]);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        fetch(`${API}/users/medical`, {
            headers: {
                "Authorization": token
            }
        })
            .then((res) => res.json())
            .then((res) => setMedHistory(res))
            .catch((error) => console.error('Error fetching medical history:', error));
    }, [API, token, medHistory]);

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleEditCancel = () => {
        setEditMode(false);
    };

    return (
        <div className='medicalBody'>
            {!editMode && (
                <>
                    {medHistory.map((person) => (
                        <div key={person.medical_id} className="personCard">
                            <h2>Medication: {person.medication}</h2>
                            <h2>Allergies: {person.allergies}</h2>
                            <h2>Blood Type: {person.blood_type}</h2>
                            <h2>Medical History: {person.medical_history}</h2>
                            <div>
                                <img
                                    onClick={handleEditClick}
                                    className="editButtonMed"
                                    src='../DarkButton.svg'
                                    alt="Edit Emergency Contact"
                                />
                            </div>
                        </div>
                    ))}
                </>
            )}

            {editMode && (
                <EditMedicalHistory
                    medHistory={medHistory}
                    setEditMode={setEditMode}
                    handleEditCancel={handleEditCancel}
                />
            )}
        </div>
    );
};

export default MedicalHistoryFetch;