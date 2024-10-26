import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import '../styles/Login.css';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Update form data on input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Decrypt password function
    const decryptPassword = (encryptedPassword) => {
        const bytes = CryptoJS.AES.decrypt(encryptedPassword, 'your_secret_key');
        return bytes.toString(CryptoJS.enc.Utf8);
    };

    // Form submission handler
    const handleSubmit = (e) => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find((user) => user.email === formData.email);

        // Check if user exists and password matches
        if (user) {
            const decryptedPassword = decryptPassword(user.password);
            if (decryptedPassword === formData.password) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                navigate('/products'); // Redirect to a protected route (e.g., Product Listing)
            } else {
                setError('Incorrect password');
            }
        } else {
            setError('Email does not exist');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                />
                {error && <p className="error">{error}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
