// Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password,
      });

      console.log('Login successful:', response.data);
      navigate('/Home ',{ state: { email }});
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  return (
    <div className="home">
      <nav className="login-navbar">
        <img className='login-blog-icon' src={require("../icons/movie-logo.png")} alt="Icon" />
       
        <Link id="login" className="Sign-Up" to="/SignUp">
          Sign-up
        </Link>
      </nav>
      <div className="login-container">
        <div className="login-form-container">
          <div className="login-title">Login</div>
          <div className="login-subtitle">
            Login to start managing your blogs!
          </div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email" 
              className="login-input-field"
              placeholder="Enter Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email" // Add autocomplete attribute
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              className="login-input-field"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password" // Add autocomplete attribute
            />
            <div className='login-forgot-password'>
              <Link to={'/Forget'}>Forgot password?</Link>
            </div>
            <button type="submit" className="login-submit-button">
              Login
            </button>
            <div className='login-creacte-acc-link'>
              <Link to={'/SignUp'}>Create a new account? - SignUp</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;