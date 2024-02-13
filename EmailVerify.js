import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './EmailVerify.css';

function EmailVerify() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const generateRandomSixDigitNumber = () => {
    return Math.floor(100000 + Math.random() * 900000);
  };

  const sendOtpByEmail = async (otp) => {
    try {
      await fetch('http://localhost:5000/api/sendOtpByEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });
    } catch (error) {
      console.error('Error sending OTP via email:', error.message);
    }
  };

  const handleForgetPasswordClick = async () => {
    try {
      if (!email.trim()) {
        console.log('Email is empty');
        return;
      }

      const response = await fetch('http://localhost:5000/api/checkEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.exists) {
        const otp = generateRandomSixDigitNumber();
        await sendOtpByEmail(otp);
        navigate('/OtpVerify', { state: { email, otp } });
      } else {
        console.log('Email does not exist');
      }
    } catch (error) {
      console.error('Error checking email:', error.message);
    }
  };

  return (
    <div>
      <nav className="navbar-emailverify">
        <img className='emailverify-blog-icon' src={require("../images/Blogger-App.png")} alt="Icon" />
        <Link to="/">Home</Link>
      </nav>
      <div className="container-email-verify">
        <div className="form-container-email-verify">
          <div className="container2-emailverify">
            <label htmlFor="email" className="emailverify-label">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              autoComplete="email"
              className="emailverify-input"
              placeholder="Enter your Email Id"
            />
            <button onClick={handleForgetPasswordClick} className="emailverify-button">
              Forget Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmailVerify;
