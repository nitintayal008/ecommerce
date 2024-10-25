// Header.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const navigate = useNavigate();
    const isAuthenticated = localStorage.getItem('currentUser') !== null;

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        navigate('/login');
    };

    return (
        <header className="header">
            <Link to="/products" className="logo">My App</Link>
            <nav className="nav">
                <Link to="/products" className="nav-link">Product Listing</Link>
                {!isAuthenticated ? (
                    <>
                        <Link to="/login" className="nav-link">Login</Link>
                        <Link to="/signup" className="nav-link">Signup</Link>
                    </>
                ) : (
                    <>
                        <Link to="/change-password" className="nav-link">Change Password</Link>
                        <button onClick={handleLogout} className="logout-button">Logout</button>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;