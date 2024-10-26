import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import '../styles/ChangePassword.css';

const ChangePassword = () => {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const decryptPassword = (encryptedPassword) => {
        const bytes = CryptoJS.AES.decrypt(encryptedPassword, 'your_secret_key');
        return bytes.toString(CryptoJS.enc.Utf8);
    };

    const encryptPassword = (password) => CryptoJS.AES.encrypt(password, 'your_secret_key').toString();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const decryptedPassword = decryptPassword(currentUser.password);

        if (formData.currentPassword !== decryptedPassword) {
            setError('Current password is incorrect');
            return;
        }

        if (formData.newPassword !== formData.confirmPassword) {
            setError('New password and confirm password do not match');
            return;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/;
        if (!passwordRegex.test(formData.newPassword)) {
            setError('Password must be 8-32 characters, with upper, lower, digit, and special character');
            return;
        }

        // Encrypt new password and update
        currentUser.password = encryptPassword(formData.newPassword);
        const users = JSON.parse(localStorage.getItem('users')).map((user) =>
            user.email === currentUser.email ? currentUser : user
        );

        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(currentUser));

        setSuccess('Password updated successfully!');
    };

    return (
        <div className="change-password-container">
            <h2>Change Password</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    name="currentPassword"
                    placeholder="Current Password"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="newPassword"
                    placeholder="New Password"
                    value={formData.newPassword}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm New Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                />
                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}
                <button type="submit">Update Password</button>
            </form>
        </div>
    );
};

export default ChangePassword;
