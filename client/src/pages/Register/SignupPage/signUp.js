import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import './signUp.css';
// import './logIn';
// import { Link } from 'react-router-dom';

function SignUp() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };
    const navigateToAboutUs = () => {
        window.location.href = '/about';
    };

    return (
        <>
            <div className='signup-container'>

                <form onSubmit={handleSubmit}>
                    <h2>Sign Up</h2>
                    <div className='form-group'>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            placeholder='First Name'
                            name="name"
                            value={formData.FirstName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            placeholder='Last Name'
                            name="name"
                            value={formData.LastName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            placeholder='eg.finmap@gmail.com'
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="password"></label>
                        <input
                            type="password"
                            placeholder='Password'
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="confirmPassword"></label>
                        <input
                            type="password"
                            placeholder='Confirm Password'
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit">Sign Up</button>
                    <p className='login-link'>Already have an account? <a href='./logIn' _blank>Log In</a></p>
                </form>
            </div>
            <nav className='about-btn'>
                <button onClick={navigateToAboutUs}>About Us</button>
            </nav>
        </>
    );
}

export default SignUp;