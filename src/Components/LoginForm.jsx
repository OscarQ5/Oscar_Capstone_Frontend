import React, { useState } from 'react';
import { useLoginDataProvider } from './LoginProvider';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const { API, setToken, setUser, setForm } = useLoginDataProvider()
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    phone_number: '', 
    password_hash: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = () => {
    fetch(`${API}/users/login`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(res => {
        if (res.user && res.user.user_id) {
            const { user, token } = res;
            setUser(user);
            setToken(token);
            setForm(formData);
            setFormData({
                phone_number: '', 
                password_hash: ''
            });
            navigate('/users/home');
        } else {
            console.log(res);
        }
    })
    .catch(err => console.log(err));
};

  return (
    <div style={{ marginTop: "50px" }}>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="phone_number">Phone Number</label> 
          <input
            type="tel" 
            id="phone_number"
            name="phone_number" 
            value={formData.phone_number} 
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password_hash">Password</label>
          <input
            type="password"
            id="password_hash"
            name="password_hash"
            value={formData.password_hash}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

export default LoginForm;
