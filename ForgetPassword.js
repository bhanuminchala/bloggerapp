import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './ForgetPassword.css'

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handlePasswordReset = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/resetPassword', { email, newPassword });

      if (response.data.success) {
        setMessage('Password reset successful');
      } else {
        setMessage('User not found. Please check your email and try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred while resetting your password.');
    }
  };

  return (
    <div>
      <nav className="forget-password-nav">
        <img className='forget-blog-icon' src={require("../icons/movie-logo.png")} alt="Icon" />
        <Link>
        </Link>
      </nav>
  <div className="container-forget">
        <div className="form-container-forget">
      <form>
      <h2 className='forget-passsword-h2'>Forget Password</h2>
      <div>
        <label className='forget-password-label'htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"  // Add id attribute
          name="email" 
          className='forget-input-email' // Add name attribute
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"  // Add autocomplete attribute
        />
      </div>
      
      <div>
        <label className='forget-password-label' htmlFor="newPassword">New Password:</label>
        <input
          type="password"
          id="newPassword"  // Add id attribute
          name="newPassword"  // Add name attribute
          className='forget-input-newpassword'
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          />
      </div>

      <button className='button-forget'onClick={handlePasswordReset}>Reset Password</button>
      <p className='forget-password-p'>{message}</p>
      </form>
          </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
