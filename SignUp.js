// SignUp.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignUp.css';

const SignUp = () => {
  const [fullName, setFullName] = useState('');
  const [Email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/signup', {
        fullName,
        Email,
        password,
        confirmPassword,
      });

      console.log('Registration successful:', response.data);
      navigate('/');
    } catch (error) {
      console.error('User registration failed:', error.message);
    }
  };

  return (
    <div className="signup">
      <nav className="navbar-signup">
        <img className='signup-blog-icon' src={require("../icons/movie-logo.png")} alt="Icon" />
      </nav>
      <div className="container-signup">
        <div className="form-container-signup">
          <div className="signup-title">Sign Up</div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              className="signup-input-field"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              autoComplete="name" // Add autocomplete attribute
            />

            <label htmlFor="Email">Email</label>
            <input
              type="email"
              id="Email"
              className="signup-input-field"
              placeholder="Enter username or email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="username" // Add autocomplete attribute
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="signup-input-field"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password" // Add autocomplete attribute
            />

            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              className="signup-input-field"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password" // Add autocomplete attribute
            />

            <div className="signup-link">
              <Link  to="/">Already have an account?</Link>
            </div>
            <br />
            <br />
            <button type="submit" className="signup-submit-button">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
