import React from 'react';
import { useState, useEffect } from 'react';
import MedicalHistoryFetch from '../Components/MedicalHistoryFetch';
import { Link } from "react-router-dom";
import MedicalHistoryPage from './MedicalHistoryPage';
import {useLoginDataProvider} from '../Components/LoginProvider';
import "../Styles/MedHistoryFetch.css"

const MedHistoryFetch = () => {
    const { API, user, token } = useLoginDataProvider()
    const [medHistory, setMedHistory] = useState([]);

    useEffect(() => {
        fetch(`${API}/users/medical`, {
            headers: {
                "Authorization": token
            }
        })
        .then((res) => res.json())
        .then((res) => setMedHistory(res))
        .catch((error) => console.error('Error fetching medical history:', error));
    }, [API, token]);

    return (
        <div className="medCab">
            <h2>Medicine Cabinet</h2>

            <div className="mCard">
        {medHistory.length === 0 ? (

            <MedicalHistoryPage />

            ) : (
            <div className="historyFetch">
            <p> <MedicalHistoryFetch /> </p>
            <Link to="/users/home"><button className="backB">Back</button></Link>
            </div>
            )
    }
            </div>       
        </div>
    );
};

export default MedHistoryFetch;