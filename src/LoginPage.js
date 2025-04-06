import React, { useState } from 'react';
import styles from './LoginPage.module.css';
import { Link, useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
        const response = await fetch('https://odk2b0d0sk.execute-api.eu-north-1.amazonaws.com/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });

        // Read the response as JSON
        const data = await response.json();

        // Check the actual status code from the response body
        if (data.statusCode === 200) {
            console.log('Login successful:', data);
            navigate('/homepage');
        } else {
            // Properly extract the error message
            let errorMessage = 'Authentication failed';
            if (data.body) {
                const parsedBody = JSON.parse(data.body);
                errorMessage = parsedBody.error || parsedBody.message || 'Authentication failed';
            }
            console.error('Login failed:', errorMessage);
            throw new Error(errorMessage);
        }
    } catch (err) {
        console.error('Error during login:', err.message);
        setError(err.message);  // Set the specific error message
    }
  };

  return (
    <div className={styles.loginPageContainer}>
      <div className={styles.topRightArc}></div>

      <div className={styles.loginContent}>
        <h1 className={styles.loginHeader}>Login here</h1>

        <div className={styles.welcomeSection}>
          <p className={styles.welcomeMessage}>
            Welcome back you've <br /> been missed!
          </p>
          <div className={styles.dividerLine}></div>
        </div>

        <form className={styles.loginForm} onSubmit={handleSubmit}>
          {error && (
            <div className={styles.errorMessage}>
              {error}
            </div>
          )}
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <div className={styles.forgotPassword}>
            <Link to="/reset" className={styles.linkStyle}>
              <p>Forgot your password?</p>
            </Link>
          </div>

          <button type="submit" className={styles.signInButton}>Sign in</button>

          <div className={styles.dividerLine}></div>
        </form>

        <div className={styles.createAccount}>
          <Link to="/signup" className={styles.linkStyle}>
            <p>Create an account!</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
