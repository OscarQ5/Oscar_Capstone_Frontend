import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLoginDataProvider } from "../Components/LoginProvider"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaRegEyeSlash } from 'react-icons/fa'
import '../Styles/EditUserForm.css'

const EditProfilePage = () => {
    const { user, API, token } = useLoginDataProvider()
    const navigate = useNavigate()
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        name: user.name,
        username: user.username,
        email: user.email,
        phone_number: user.phone_number
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (password !== confirmPassword) {
                toast.error("Passwords do not match")
                return
            }

            const userData = { ...formData };
            if (password !== '') {
                userData.password_hash = password
            }

            const response = await fetch(`${API}/users/${user.user_id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': token
                },
                body: JSON.stringify(userData)
            });
            if (response.ok) {
                toast.success("User updated successfully")
                navigate('/users/home')
            } else {
                console.error("Failed to update user")
            }
        } catch (error) {
            console.error("Error updating user:", error)
            toast.error("Error updating user")
        }
    }

    useEffect(() => {
        fetch(`${API}/users/${user.user_id}`, {
            headers: {
                Authorization: token
            }
        })
            .then(res => res.json())
            .then(data => {
                setFormData({
                    name: data.name,
                    username: data.username,
                    email: data.email,
                    phone_number: data.phone_number
                });
            })
            .catch(error => console.error("Error fetching user data:", error));
    }, [API, token, user.id]);

    return (
        <div className='editProfilePageBody'>
        <div className="editProfilePage">
            <ToastContainer className='toastify'/>
            <h2>Edit Profile</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label><br />
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="username">Username</label><br />
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label><br />
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="phone_number">Phone Number</label><br />
                    <input
                        type="text"
                        id="phone_number"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">New Password</label><br />
                    <div className="password-input-container">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        {showPassword ? (
                            <FaEye className="eye-icon" onClick={() => setShowPassword(false)} />
                        ) : (
                            <FaRegEyeSlash className="eye-icon" onClick={() => setShowPassword(true)} />
                        )}
                    </div>
                </div>
                <div>
                    <label htmlFor="confirm_password">Confirm New Password</label><br />
                    <div className='password-input-container' >
                        <input
                            type={showPassword ? "text" : "password"}
                            id="confirm_password"
                            name="confirm_password"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                        />
                        {showPassword ? (
                            <FaEye className="eye-icon" onClick={() => setShowPassword(false)} />
                        ) : (
                            <FaRegEyeSlash className="eye-icon" onClick={() => setShowPassword(true)} />
                        )}
                    </div>
                </div>
                <button className='editUserButton' type="submit">Save Changes</button>
            </form>
        </div>
        </div>
    )
}

export default EditProfilePage