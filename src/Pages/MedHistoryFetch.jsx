import React, { useState, useEffect } from 'react';
import MedicalHistoryFetch from '../Components/MedicalHistoryFetch';
import { Link } from "react-router-dom";
import MedicalHistoryPage from './MedicalHistoryPage';
import { useLoginDataProvider } from '../Components/LoginProvider';
import "../Styles/MedHistoryFetch.css"

const MedHistoryFetch = () => {
    const { API, token } = useLoginDataProvider()
    const [medHistory, setMedHistory] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        const fetchMedicalHistory = async () => {
            try {
                setError("")
                setLoading(true)
                const response = await fetch(`${API}/users/medical`, {
                    headers: {
                        "Authorization": token
                    }
                })
                if (response.ok) {
                    const data = await response.json()
                    setMedHistory(data)
                } else {
                    const { error } = await response.json()
                    setError(error)
                }
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        };

        fetchMedicalHistory()
    }, [API, token])

    const renderContent = () => {
        if (loading) {
            return <div>Loading...</div>
        } else if (error) {
            return <div className="error">{error}</div>
        } else if (medHistory.length === 0) {
            return <MedicalHistoryPage />
        } else {
            return (
                <div className="historyFetch">
                    <MedicalHistoryFetch />
                    <Link to="/users/home"><button className="backB">Back</button></Link>
                </div>
            )
        }
    }

    return (
        <div className="medCab">
            <h2>Medicine Cabinet</h2>

            <div className="mCard">
                {renderContent()}
            </div>
        </div>
    )
}

export default MedHistoryFetch