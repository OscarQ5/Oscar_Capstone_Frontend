import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/SignupForm.css'
import { useLoginDataProvider } from "./LoginProvider"
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

function SignupForm() {
    const { API, setToken, setUser, setForm } = useLoginDataProvider()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        password_hash: '',
        email: '',
        phone_number: '',
        username: ''
    });

    const handleChange = (e) => {
        const { id, value } = e.target;

        if (id === "phone_number") {
            setFormData(prevState => ({
                ...prevState,
                phone_number: value
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [id]: value
            }));
        }
    };

    const handleSubmit = (event) => {

        event.preventDefault();

        console.log(API, formData)

        fetch(`${API}/users/sign-up`, {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to create user');
                }
                return res.json();
            })
            .then(res => {
                if (res.user) {
                    console.log("User created successfully:", res.user);
                    const { user, token } = res;
                    setUser(user);
                    setToken(token);
                    setForm(formData);
                    setFormData({
                        name: '',
                        password_hash: '',
                        email: '',
                        phone_number: '',
                        username: ''
                    })
                    navigate(`${user.user_id}/contacts`);
                } else {
                    console.log("Failed to create user:", res);
                }
            })
            .catch(err => {
                console.error("Error creating user:", err);

            });
    };

    return (
        <div className="signUpForm">

            <form onSubmit={handleSubmit} className="newForm">

                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    value={formData.name}
                    type="text"
                    onChange={handleChange}
                    placeholder="ex. Jane Doe"
                    required
                />

                <label htmlFor="username">User Name</label>
                <input
                    id="username"
                    value={formData.username}
                    type="text"
                    onChange={handleChange}
                    placeholder="ex. Jane D."
                    required
                />

                <label htmlFor="password_hash">Password </label>
                <input
                    id="password_hash"
                    value={formData.password_hash}
                    type="password"
                    onChange={handleChange}
                    placeholder="Password"
                    required
                />

                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    value={formData.email}
                    type="text"
                    onChange={handleChange}
                    placeholder="ex. JaneDoe@example.com"
                    required
                />

                <label htmlFor="phone_number">Phone Number</label>
                <PhoneInput
                    id="phone_number"
                    value={formData.phone_number}
                    onChange={(value) => setFormData({ ...formData, phone_number: value })}
                    placeholder="ex. 111-222-3333"
                    defaultCountry="US"
                    required
                />

                <div className="submitButton">
                    <button className="signUpsubmitButton"type="submit" >Submit</button>
                </div>
            </form>

        </div>
    )

}

export default SignupForm;