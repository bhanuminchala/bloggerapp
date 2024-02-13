import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './OtpVerify.css';

function OtpVerify() {
  const [enteredOtp, setEnteredOtp] = useState('');
  const [isOtpCorrect, setIsOtpCorrect] = useState(true);
  const [otpExpiration, setOtpExpiration] = useState(Date.now() + 3 * 60 * 1000); // 3 minutes
  const [showSendAgain, setShowSendAgain] = useState(false);
  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime(otpExpiration));

  const navigate = useNavigate();
  const location = useLocation();
  const { email, otp } = location.state || {};

  // Move the function declaration to the top
  function calculateRemainingTime(expirationTime) {
    const remainingMilliseconds = Math.max(0, expirationTime - Date.now());
    const remainingMinutes = Math.floor((remainingMilliseconds / (1000 * 60)) % 60);
    const remainingSeconds = Math.floor((remainingMilliseconds / 1000) % 60);

    return { minutes: remainingMinutes, seconds: remainingSeconds };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = calculateRemainingTime(otpExpiration);
      setRemainingTime(remaining);

      if (Date.now() >= otpExpiration) {
        setShowSendAgain(true);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [otpExpiration]);

  const handleOtpChange = (e) => {
    setEnteredOtp(e.target.value);
    setIsOtpCorrect(true);
  };

  const handleVerifyButtonClick = () => {
    // eslint-disable-next-line
    if (enteredOtp == otp) {
      if (Date.now() < otpExpiration) {
        navigate('/ForgetPassword');
      } else {
        setIsOtpCorrect(false);
      }
    } else {
      setIsOtpCorrect(false);
    }
  };

  const handleSendAgainClick = () => {
    const newOtp = generateRandomSixDigitNumber();
    sendOtpByEmail(newOtp);
    setEnteredOtp('');
    setIsOtpCorrect(true);
    setOtpExpiration(Date.now() + 3 * 60 * 1000); // 3 minutes
    setShowSendAgain(false);
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

  return (
    <div>
      <nav className="navbar-Otp-Verify">
        <img className='otpverify-blog-icon' src={require("../images/Blogger-App.png")} alt="Icon" />
        <Link to="/">Home</Link>
      </nav>
      <div className="container-Otp">
        <div className="form-container-Otp">
          <div className="Otp-Verify">
            <h1 className='otp-h1'>OTP Verification</h1>
            <label  className='label-otp'htmlFor="otp">Enter OTP:</label>
            <input
              type="text"
              id="otp"
              className='otp-input'
              name="otp"
              value={enteredOtp}
              onChange={handleOtpChange}
              placeholder="Enter OTP"
            />
            {isOtpCorrect ? null : (
              <p className="error-message">Incorrect OTP. Please try again.</p>
            )}
            <button className='otp-button'onClick={handleVerifyButtonClick}>Verify</button>
            <p className="expiration-time">
              {remainingTime.minutes} minutes {remainingTime.seconds} seconds remaining
            {showSendAgain && (
              <button className='otp-button-again' onClick={handleSendAgainClick}>Send Again</button>
            )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OtpVerify;
