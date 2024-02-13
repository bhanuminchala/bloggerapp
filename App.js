// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import Login from './views/Login';
import SignUp from './views/SignUp';
import Write from './views/Write';
import ForgetPassword from './views/ForgetPassword';
import Forget from './views/EmailVerify';
import OtpVerify from './views/OtpVerify';
import BlogDetail from './views/BlogDetail'; 
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/write" element={<Write />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/forget" element={<Forget />} />
          <Route path="/otpverify" element={<OtpVerify />} />
          <Route path="/blog/:blogId" element={<BlogDetail />} />  {/* New route for BlogDetail */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
