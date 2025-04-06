import React from 'react';
import { Link } from 'react-router-dom'; // Import Link component for navigation
import './Welcome.css'; 

function Welcome() {
  return (
    <div className="login-container">
      <div className="logo-container">
        <img
          src={`${process.env.PUBLIC_URL}/welcome.png`}
          alt="MediScheduler Logo"
          className="logo"
        />
        <h1>MediScheduler</h1>
        <p1>Your time, Your Health,<br />Simplified.</p1>
      </div>

      <div className="button-container">
        <Link to="/login"> {/* Link to the login page */}
          <button className="btn">Login</button>
        </Link>
        <Link to="/signup">
        <button className="btn">Register</button>
        </Link>
      </div>
    </div>
  );
}

export default Welcome;
