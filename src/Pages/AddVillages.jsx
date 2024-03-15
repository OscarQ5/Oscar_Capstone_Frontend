import React, { useState } from 'react';
import { useLoginDataProvider } from "../Components/LoginProvider";
import { useNavigate, Link } from 'react-router-dom';


const AddVillages = () => {
    const { API, token, user} = useLoginDataProvider();
    const navigate = useNavigate();

    const [villageForm, setVillageForm] = useState({
        village_name: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVillageForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const addVillage = async () => {
        try {
            const response = await fetch(`${API}/users/villages/`, {
                method: "POST",
                body: JSON.stringify(villageForm),
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': token
                },
            });

            if (response.ok) {
                console.log("Village Successfully Added",response)
                navigate(`/users/villages`);
            } else {
                throw new Error('Failed to add village');
            }
        } catch (error) {
            console.error("Error adding village:", error);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        addVillage();
    };

    return (
        <div className="addVillageForm">
            <form onSubmit={handleSubmit} className="villageForm">
                
                <label htmlFor="village_name">Village Name:</label>
                <input
                    id="village_name"
                    name="village_name"
                    value={villageForm.village_name}
                    type="text"
                    onChange={handleChange}
                    placeholder="ex. Pursuit Family"
                    required
                />

                <div className="submitButton-EC">
                    <Link to={`/users/villages`}><button type="button">Back</button></Link>
                    <button type="submit">Add</button>
                </div>
            </form>
        </div>
    );
};

export default AddVillages;
