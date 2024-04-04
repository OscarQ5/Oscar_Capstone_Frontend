import React, { useState } from 'react';
import { useLoginDataProvider } from "../Components/LoginProvider";
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Styles/AddVillages.css'

const AddVillages = () => {
    const { API, token, user } = useLoginDataProvider();
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

            const data = await response.json();
            if (response.ok) {
                console.log("Village Successfully Added", data);
                navigate(`/users/villages`);
            } else {
                throw new Error(data.error);
            }
        } catch (error) {
            console.error("Error adding village:", error);
            toast.error(error.message || 'Failed to add village. Please try again later.', { autoClose: 3000 });
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        addVillage();
    };

    return (
        <div className="addVillageForm">
            <ToastContainer className="toastify" />
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
