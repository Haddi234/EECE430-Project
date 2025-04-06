import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './LoginPage.module.css';

function VerifyEmailPage() {
    const navigate = useNavigate();
    const location = useLocation();

    const [verificationCode, setVerificationCode] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    // Get email passed via navigate state
    useEffect(() => {
        if (location.state?.email) {
            setEmail(location.state.email);  // Set email if passed via navigation
        }
    }, [location.state]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!email || !verificationCode) {
            setMessage('Email or verification code is missing');
            return;
        }

        try {
            const response = await fetch('https://ar41fcxxtc.execute-api.eu-north-1.amazonaws.com/new', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, verificationCode })
            });

            const data = await response.json();

            if (response.status === 200) {
                setMessage('Email successfully verified!');
                setTimeout(() => {
                    navigate('/login');  // Redirect to login page after successful verification
                }, 2000);
            } else {
                setMessage('Error: ' + (data.message || 'Verification failed.'));
            }
        } catch (error) {
            setMessage('Error: ' + error.message);
        }
    };

    return (
        <div className={styles.loginPageContainer}>
            <div className={styles.topRightArc}></div>
            
            <div className={styles.loginContent}>
                <h1 className={styles.loginHeader}>Verify Your Email</h1>

                <form className={styles.loginForm} onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="verificationCode">Verification Code</label>
                        <input
                            type="text"
                            id="verificationCode"
                            placeholder="Enter the verification code"
                            required
                            value={verificationCode}
                            onChange={e => setVerificationCode(e.target.value)}
                        />
                    </div>

                    <div className={styles.dividerLine}></div>

                    {message && <p className={styles.simpleMessage}>{message}</p>}

                    <button type="submit" className={styles.signInButton}>Verify</button>
                </form>
            </div>
        </div>
    );
}

export default VerifyEmailPage;
