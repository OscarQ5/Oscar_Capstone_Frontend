import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useLoginDataProvider } from "../Components/LoginProvider";
import "../Styles/GetVillage.css"

const GetVillage = () => {
    const { village_id } = useParams();
    const [village, setVillage] = useState(null);
    const { API, token, user, setUser } = useLoginDataProvider();
    const [allUsers, setAllUsers] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [villageUsers, setVillageUsers] = useState([]);
    const [joinRequests, setJoinRequests] = useState([])
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
    });

    useEffect(() => {
        if (user.is_admin) {

            fetch(`${API}/users/villageJoinRequests/${village_id}`, {
                headers: {
                    "Authorization": token
                }
            })
                .then((res) => res.json())
                .then((data) => setJoinRequests(data))
                .catch((error) => console.error("Error fetching join requests:", error));
        }
    }, [API, token, village_id, user.is_admin])

    useEffect(() => {
        fetch(`${API}/users`, {
            headers: {
                "Authorization": token
            }
        })
            .then((res) => res.json())
            .then((res) => setAllUsers(res))
            .catch((error) => console.error("Error fetching all users:", error));
    }, [API, token]);

    useEffect(() => {
        if (!village_id) return;

        fetch(`${API}/users/villages/village/${village_id}`, {
            headers: {
                "Authorization": token
            }
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Failed to fetch village');
                }
                return res.json();
            })
            .then((data) => {
                const isAdmin = user.user_id === data.creator_id
                setUser(prevUser => ({
                    ...prevUser,
                    is_admin: isAdmin
                }))
                setVillage(data)
            })
            .catch((error) => console.error("Error fetching village:", error));
    }, [API, token, village_id]);

    const handleSearch = (e) => {
        e.preventDefault();

        const results = allUsers.filter(user =>
            user.username === formData.username
        );

        setSearchResults(results);
    };


    const handleAddToVillage = async (userId) => {
        try {
            const requestBody = { user_id: userId, village_id: +village_id };

            const response = await fetch(`${API}/users/village-users/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify(requestBody),
            });

            if (response.ok) {

                const updatedResponse = await fetch(`${API}/users/village-users/${village_id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': token
                    },
                });
                const updatedData = await updatedResponse.json();
                const usersWithInfo = await Promise.all(updatedData.map(async (user) => {
                    const userInfoResponse = await fetch(`${API}/users/${user.user_id}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            'Authorization': token
                        },
                    });
                    const userInfo = await userInfoResponse.json();
                    return { ...user, userInfo };
                }))
                setVillageUsers(usersWithInfo);

                const updatedSearchResults = searchResults.filter(result => result.user_id !== userId);
                setSearchResults(updatedSearchResults);
            } else {
                const errorData = await response.json();
                console.error('Error Response:', errorData);
                throw new Error(errorData.error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API}/users/village-users/${village_id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': token
                    },
                });
                const data = await response.json()
                const usersWithInfo = await Promise.all(data.map(async (user) => {
                    const userInfoResponse = await fetch(`${API}/users/${user.user_id}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            'Authorization': token
                        },
                    });
                    const userInfo = await userInfoResponse.json();
                    return { ...user, userInfo };
                }))
                setVillageUsers(usersWithInfo)
            } catch (error) {
                console.error(error)
            }
        };

        fetchData()
    }, [village_id, API, token]);

    const handleDelete = (villageUserId) => {
        fetch(`${API}/users/village-users/${villageUserId}`, {
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

                setVillageUsers(prevUsers => prevUsers.filter(user => user.user_id !== villageUserId));
            })
            .catch(err => console.error("Error deleting:", err));
    };

    const { username } = formData;

    if (!village) {
        return <div>Loading...</div>;
    }

    const handleRejectClick = (request) => {
        const confirmed = window.confirm("Are you sure you want to reject this request?");
        if (confirmed) {
            handleReject(request);
        }
    }

    const handleApproveClick = (request) => {
        const confirmed = window.confirm("Are you sure you want to approve this request?");
        if (confirmed) {
            handleApprove(request);
        }
    }

    const handleApprove = async (request) => {
        try {
            await handleAddToVillage(request.user_id)
            setJoinRequests(joinRequests.filter(req => req.request_id !== request.request_id));
            await fetch(`${API}/users/villageJoinRequests/${request.request_id}`, {
                method: 'DELETE',
                headers: {
                    "Authorization": token
                }
            })
            alert("Request approved successfully!")
        } catch (error) {
            console.error('Error approving request:', error);
            alert("Failed to approve request. Please try again.");
        }
    }

    const handleReject = async (request) => {
        try {
            const response = await fetch(`${API}/users/villageJoinRequests/${request.request_id}`, {
                method: 'DELETE',
                headers: {
                    "Authorization": token
                }
            });

            if (response.ok) {
                setJoinRequests(joinRequests.filter(req => req.request_id !== request.request_id));
                alert("Request rejected successfully!");
            } else {
                throw new Error('Failed to reject request');
            }
        } catch (error) {
            console.error('Error rejecting request:', error);
            alert("Failed to reject request. Please try again.");
        }
    }

    return (
        <div className="getVillageBody">
            <h2>Village Details</h2>

            <div className="getVillForm">
                <div className="searchR">
                    <h2>Find User 🔎</h2>
                    <div className="phoneFilter">

                        <form onSubmit={handleSearch}>
                            <label htmlFor="username">Enter User Name:</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={username}
                                placeholder="ex. Jane D."
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            />
                            <div>
                                <h2>Search Result:</h2>
                                {searchResults.map((result) => (
                                    <div key={result.user_id} className="search-result">
                                        <h2>Name: {result.name}</h2> <h2> User Name: {result.username}</h2>
                                        <div className="addB">
                                            <button className='addButton' onClick={() => handleAddToVillage(result.user_id, village_id)}>Add</button>
                                        </div>
                                    </div>
                                ))}

                            </div>
                            <button className='searchButton' type="submit">Search</button>
                        </form>

                    </div>

                </div>
                <div className='villageDetail'>
                    <h2>Village Name: {village.village_name}</h2>
                    <div>

                        <div >
                            {villageUsers.map(user => (
                                <div className="villageMemberCard" key={user.user_id}>
                                    <h2>
                                        Name: {user.userInfo.name} <br />
                                        User Name: {user.userInfo.username}<br />
                                        Role: {user.is_admin ? 'Admin' : 'Member'}
                                    </h2>
                                    <button className="deleteButton" onClick={() => {
                                        console.log("Deleting user with ID:", user.user_id);
                                        handleDelete(user.user_id);
                                    }}>❌</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {user.is_admin && (
                <div className="joinRequestsSection">
                    <h2>Join Requests</h2>
                    <ul>
                        {joinRequests.map(request => (
                            <li key={request.request_id}>
                                <p>User: {request.user_id}</p>
                                <p>Date: {request.request_date}</p>
                                <button onClick={() => handleApproveClick(request)}>Approve</button>
                                <button onClick={() => handleRejectClick(request)}>Reject</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <Link className="villagePageBackLink" to='/users/villages'><button className="villagePageBackB">Back</button></Link>
        </div>
    );
};

export default GetVillage;
