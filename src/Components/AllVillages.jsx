import React, { useState, useEffect } from 'react';
import { useLoginDataProvider } from "./LoginProvider";
import { Link } from 'react-router-dom';
import '../Styles/AllVIllages.css'

const AllVillages = () => {
    const [villages, setVillages] = useState([]);
    const { API, token, user } = useLoginDataProvider();
    const [allVillages, setAllVillages] = useState([])
    const [searchResults, setSearchResults] = useState([])
    const [formData, setFormData] = useState({
        village_name: "",
    })
    console.log(allVillages)
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

    useEffect(() => {
        fetch(`${API}/users/villages/allvillages`, {
            headers: {
                "Authorization": token
            }
        })
            .then((res) => res.json())
            .then((res) => setAllVillages(res))
            .catch((error) => console.error("Error fetching villages:", error));
    }, [API, token])

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

                setVillages(prevVillages => prevVillages.filter(village => village.village_id !== villageId));
            })
            .catch(err => console.error("Error deleting village:", err));
    };

    const handleSearch = (e) => {
        e.preventDefault();

        const results = allVillages.filter(village =>
            village.village_name === formData.village_name
        );

        setSearchResults(results);
    }

    const handleRequest = async (user_id, village_id) => {
        try {
            const response = await fetch(`${API}/users/villageJoinRequests`, {
                method: 'POST',
                body: JSON.stringify({ user_id, village_id }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            });
            if (response.ok) {
                console.log('Join request sent successfully');
            } else {
                const errorData = await response.json();
                console.error('Error Response:', errorData);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <div className='villageCardBody'>
            <div className="searchRV">
                <h2>Find Village 🔎</h2>
                <div className="phoneFilter">
                    <form onSubmit={handleSearch}>
                        <label htmlFor="village_name">Enter Village Name:</label>
                        <input
                            type="text"
                            id="village_name"
                            name="village_name"
                            value={formData.village_name}
                            placeholder="ex. Pursuit"
                            onChange={(e) => setFormData({ ...formData, village_name: e.target.value })}
                        />
                        <div>
                            <h2>Search Result:</h2>
                            {searchResults.map((result) => (
                                <div key={result.village_id} className="search-result">
                                    <h2>Viilage Name: {result.village_name}</h2> <h2> Village Code: {result.village_code}</h2>
                                    <div className="requestB">
                                        <button className='requestButton' onClick={() => handleRequest(user.user_id, result.village_id)} >Request</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className='searchButton' type="submit">Search</button>
                    </form>
                </div>
            </div>
            <div className='masterVillageCard'>
                {villages.map((village) => (
                    <div key={village.village_id} className="villageCard">
                        <Link to={`/users/villages/village/${village.village_id}`} className="villageLink">
                            {village.village_name}
                        </Link>
                        <button className="villageDelete" onClick={() => handleDelete(village.village_id)}>❌</button>
                    </div>
                ))}
                </div>
            </div>
        </div>
    );
};

export default AllVillages;