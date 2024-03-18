import React, { useState } from 'react';
import { useLoginDataProvider } from './LoginProvider';
import { useNavigate } from 'react-router-dom';
import '../Styles/LoginPage.css';

const LoginForm = () => {
    const { API, setToken, setUser, setForm } = useLoginDataProvider();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        password_hash: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleLogin = (e) => {
        e.preventDefault();
        fetch(`${API}/users/login`, {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(res => {
            if (res.token && res.user.user_id) {
                const { user, token } = res;
                setUser(user);
                setToken(token);
                setForm(formData);
                setFormData({
                    username: '',
                    password_hash: ''
                });
                navigate(`/users/home`);
            } else {
                console.log("Login failed:", res);
            }
        })
        .catch(err => console.error("Login error:", err));
    };

    return (
        <div className="loginFormBody">
            <form onSubmit={handleLogin} className='loginFormPage'>
                <label htmlFor="username">User Name</label>
                <input
                    id="username"
                    name="username" 
                    value={formData.username}
                    type="text"
                    onChange={handleInputChange}
                    placeholder="ex. Jane D."
                    required
                />

                <label htmlFor="password_hash">Password</label>
                <input
                    className="password"
                    type="password"
                    id="password_hash"
                    name="password_hash"
                    value={formData.password_hash}
                    onChange={handleInputChange}
                    required
                />

                <button className='loginSubmit' type="submit">Log in</button>
            </form>
        </div>
    );
};

export default LoginForm;
