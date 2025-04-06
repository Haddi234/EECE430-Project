import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Router and Routes
import Welcome from './Welcome'; // Import the Welcome page
import LoginPage from './LoginPage'; // Import the LoginPage component
import SignUpPage from './SignUp';
import ResetPasswordPage from './ResetPassword';
import ConfirmPasswordPage from './ConfirmPassword';
import VerifyEmailPage from './VerifyEmail';
import HomePage from './HomePage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Welcome />} /> {/* Welcome page at root */}
          <Route path="/login" element={<LoginPage />} /> {/* Login page at /login */}
          <Route path="/signup" element={<SignUpPage/>}/>
          <Route path="reset" element={<ResetPasswordPage/>}/>
          <Route path="/confirm" element={<ConfirmPasswordPage/>}/>
          <Route path="/verify" element={<VerifyEmailPage/>}/>
          <Route path="/homepage" element={<HomePage/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
