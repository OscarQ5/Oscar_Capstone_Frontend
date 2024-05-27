import React, { useState, useEffect } from 'react';
import { useLoginDataProvider } from "./LoginProvider";
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Styles/AllVIllages.css'

const AllVillages = () => {
    const [villages, setVillages] = useState([]);
    const { API, token, user } = useLoginDataProvider();
    const [allVillages, setAllVillages] = useState([])
    const [searchResults, setSearchResults] = useState([])
    const [sortKey, setSortKey] = useState("village_name")
    const [sortOrder, setSortOrder] = useState("ascending")
    const [formData, setFormData] = useState({
        village_name: "",
    })
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

    const handleSearch = (e) => {
        e.preventDefault();

        const results = allVillages.filter(village => village.village_name.toLowerCase().includes(formData.village_name.toLowerCase()))

        setSearchResults(results);
    }

    const handleSortKeyChange = (e) => {
        setSortKey(e.target.value)
    }

    const toggleSortOrder = () => {
        setSortOrder(sortOrder === "ascending" ? "descending" : "ascending")
    }

    const sortVillages = (villages) => {
        return [...villages].sort((a, b) => {
            const valueA = a[sortKey]
            const valueB = b[sortKey]
            if (sortOrder === "ascending") {
                return valueA < valueB ? -1 : 1
            } else {
                return valueB < valueA ? -1 : 1
            }
        })
    }

    const showAlert = (message) => {
        const alertElement = document.createElement('div');
        alertElement.className = 'alert';
        alertElement.textContent = message;

        document.body.appendChild(alertElement);

        setTimeout(() => {
            alertElement.remove();
        }, 3000);
    };
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

                showAlert("Join request sent successfully")
                setSearchResults([])
                setFormData({ village_name: "", })

            } else {
                const errorData = await response.json();
                showAlert("Error sending request. Try again")
                console.error('Error Response:', errorData);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="allVBodyMaster">
            <div className='villageCardBody'>
                <ToastContainer className='toastify' />
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
                <div className="sortControls">
                    <label>Sort by: </label>
                    <select value={sortKey} onChange={handleSortKeyChange}>
                        <option value="village_name">Village Name</option>
                        <option value="village_code">Village Code</option>
                    </select>
                    <button onClick={toggleSortOrder}>
                        {sortOrder === "ascending" ? "ascending ⬆️" : "descending ⬇️"}
                    </button>
                </div>
                <div className='masterVillageCard'>
                    {sortVillages(villages).map((village) => (
                        <div key={village.village_id} className="villageCard">
                            <Link to={`/users/villages/village/${village.village_id}`} className="villageLink">
                                Village: {village.village_name} <br/>
                                Code: {village.village_code}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllVillages;