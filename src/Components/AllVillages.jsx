import React, { useState, useEffect } from 'react';
import { useLoginDataProvider } from "./LoginProvider";
import { Link, useParams } from 'react-router-dom';
import '../Styles/AllVillages.css'

const AllVillages = () => {
    const [villages, setVillages] = useState([]);
    const { API, token } = useLoginDataProvider();

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

    const handleDelete = (villageId) => {
        fetch(`${API}/users/villages/${villageId}`, {
            method: "DELETE",
            headers: {
                "Authorization": token
            }
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error("Failed to delete");
                }
                console.log("Completed Delete");
                // Update villages state after successful deletion
                setVillages(prevVillages => prevVillages.filter(village => village.village_id !== villageId));
            })
            .catch(err => console.error("Error deleting village:", err));
    };

    return (
        <div>
            <div className='villageCardBody'>
                {villages.map((village) => (
                    <div key={village.village_id} className="villageCard">
                        <Link to={`/users/villages/${village.village_id}`} className="villageLink">
                            {village.village_name}
                        </Link>
                        <button className="villageDelete" onClick={() => handleDelete(village.village_id)}>❌</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllVillages;