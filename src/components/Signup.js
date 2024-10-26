import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import '../styles/Signup.css';

const Signup = () => {
    const navigate = useNavigate();
    
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            mobile: '',
            password: '',
            confirmPassword: ''
        }
    });

    const encryptPassword = (password) => CryptoJS.AES.encrypt(password, 'your_secret_key').toString();

    const onSubmit = (data) => {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.some((user) => user.email === data.email)) {
            alert('Email already exists');
            return;
        }

        const newUser = {
            ...data,
            password: encryptPassword(data.password),
        };
        delete newUser.confirmPassword;
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        alert('Signup successful!');
        navigate('/login');
    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    placeholder="First Name"
                    {...register('firstName', { required: 'First name is required' })}
                />
                {errors.firstName && <p className="error">{errors.firstName.message}</p>}

                <input
                    type="text"
                    placeholder="Last Name"
                    {...register('lastName', { required: 'Last name is required' })}
                />
                {errors.lastName && <p className="error">{errors.lastName.message}</p>}

                <input
                    type="email"
                    placeholder="Email"
                    {...register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                            message: 'Invalid email format'
                        }
                    })}
                />
                {errors.email && <p className="error">{errors.email.message}</p>}

                <input
                    type="text"
                    placeholder="Mobile Number"
                    {...register('mobile', { required: 'Mobile number is required' })}
                />
                {errors.mobile && <p className="error">{errors.mobile.message}</p>}

                <input
                    type="password"
                    placeholder="Password"
                    {...register('password', {
                        required: 'Password is required',
                        minLength: { value: 8, message: 'Password must be at least 8 characters' },
                        pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/,
                            message: 'Password must include upper, lower, digit, and special character'
                        }
                    })}
                />
                {errors.password && <p className="error">{errors.password.message}</p>}

                <input
                    type="password"
                    placeholder="Confirm Password"
                    {...register('confirmPassword', {
                        required: 'Confirm Password is required',
                        validate: (value) =>
                            value === watch('password') || 'Passwords do not match'
                    })}
                />
                {errors.confirmPassword && <p className="error">{errors.confirmPassword.message}</p>}

                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default Signup;
