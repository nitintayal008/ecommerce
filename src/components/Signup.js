import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import '../styles/Signup.css';

const Signup = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    
    // Update form data on input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Helper function to encrypt password
    const encryptPassword = (password) => CryptoJS.AES.encrypt(password, 'your_secret_key').toString();

    // Form submission handler
    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Check if email already exists in localStorage
        let users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.some((user) => user.email === formData.email)) {
            setErrors({ email: 'Email already exists' });
            return;
        }

        // Encrypt password and save user
        const newUser = {
            ...formData,
            password: encryptPassword(formData.password),
        };
        delete newUser.confirmPassword;
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        alert('Signup successful!');
        navigate('/login');
    };

    // Form validation function
    const validateForm = () => {
        const { firstName, lastName, email, mobile, password, confirmPassword } = formData;
        const errors = {};

        if (!firstName) errors.firstName = 'First name is required';
        if (!lastName) errors.lastName = 'Last name is required';
        if (!email) errors.email = 'Email is required';
        if (!mobile) errors.mobile = 'Mobile number is required';
        if (!password) errors.password = 'Password is required';
        if (password !== confirmPassword) errors.confirmPassword = 'Passwords do not match';

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/;
        if (!passwordRegex.test(password)) {
            errors.password = 'Password must be 8-32 characters, with upper, lower, digit, and special character';
        }

        return errors;
    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                {/* Form Fields */}
                <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} />
                {errors.firstName && <p className="error">{errors.firstName}</p>}

                <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} />
                {errors.lastName && <p className="error">{errors.lastName}</p>}

                <input type="email" name="email" placeholder="Email" onChange={handleChange} />
                {errors.email && <p className="error">{errors.email}</p>}

                <input type="text" name="mobile" placeholder="Mobile Number" onChange={handleChange} />
                {errors.mobile && <p className="error">{errors.mobile}</p>}

                <input type="password" name="password" placeholder="Password" onChange={handleChange} />
                {errors.password && <p className="error">{errors.password}</p>}

                <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} />
                {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}

                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default Signup;
