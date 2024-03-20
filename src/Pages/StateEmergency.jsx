import React, { useState, useEffect } from 'react';
import FetchLocation from "../Components/FetchLocation.jsx";
import UserLocation from '../Components/UserLocation.jsx';
import '../Styles/StateEmergency.css'
import { useLoginDataProvider } from '../Components/LoginProvider';

const StateEmergency = () => {
    const [villages, setVillages] = useState([]);
    const { API, token } = useLoginDataProvider();
    const [selectedVillage, setSelectedVillage] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        fetch(`${API}/users/villages`, {
            headers: {
                "Authorization": token
            }
        })
        .then((res) => res.json())
        .then((res) => setVillages(res))
        .catch((error) => console.error("Error fetching villages:", error));
    }, [API, token]);

    const handleVillageSelect = (e) => {
        setSelectedVillage(e.target.value);
    }

    const handleVillageClick = () => {
        setShowDropdown(!showDropdown);
    }

    return (
        <div className="stateEmergencyBody">
            {/* <FetchLocation /> */}
            <UserLocation />

            {showDropdown && (
                <select
                    value={selectedVillage}
                    onChange={handleVillageSelect}
                    className="villageDropdown"
                >
                    <option value="">Select a Village</option>
                    {villages.map(village => (
                        <option key={village.village_id} value={village.village_name}>
                            {village.village_name}
                        </option>
                    ))}
                </select>
            )}
            <div className="emergencyButtons">

                <div className='buttonDiv'>
                    <h4>  911 </h4>
                    <a href="tel:911">
                        <img className="emergencyServices" src="/blueStar.svg" alt="Emergency Services" />
                    </a>
                </div>

                <div className='buttonDiv' onClick={handleVillageClick}>
                    <h4>  911 + Village </h4>
                    <img className="emergencyServices" src="/arrows.svg" alt="Emergency Services" />
                </div>

                <div className='buttonDiv' onClick={handleVillageClick}>
                    <h4>  Village </h4>
                    <img className="emergencyServices" src="/community.svg" alt="Emergency Services" />
                </div>

            </div>

        </div>
    );
};

export default StateEmergency;
