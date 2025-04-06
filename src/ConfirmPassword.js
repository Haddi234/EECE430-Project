import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css';

function ConfirmPasswordPage() {
    const navigate = useNavigate();
    const [verificationCode, setVerificationCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (newPassword !== confirmPassword) {
            setMessage('Passwords do not match.');
            return;
        }

        try {
            const response = await fetch('https://yi3l6bo7eh.execute-api.eu-north-1.amazonaws.com/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ verificationCode, newPassword })
            });

            const data = await response.json();
            if (response.status === 200) {
                setMessage('Password reset successfully!');
                setTimeout(() => {
                    navigate('/login');  // Redirect to login page after successful reset
                }, 2000);
            } else {
                setMessage(`Error: ${data.message || 'Password reset failed.'}`);
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Network error. Please try again.');
        }
    };

    return (
        <div className={styles.loginPageContainer}>
            <div className={styles.topRightArc}></div>
            
            <div className={styles.loginContent}>
                <h1 className={styles.loginHeader}>Set New Password</h1>
                
                <div className={styles.welcomeSection}>
                    <p className={styles.welcomeMessage}>
                        Enter the verification code sent to your email and set your new password.
                    </p>
                    <div className={styles.dividerLine}></div>
                </div>

                {message && (
                    <div style={{
                        color: 'green',
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        textAlign: 'center',
                        marginBottom: '1rem'
                    }}>
                        {message}
                    </div>
                )}

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

                    <div className={styles.inputGroup}>
                        <label htmlFor="newPassword">New Password</label>
                        <input
                            type="password"
                            id="newPassword"
                            placeholder="Enter new password"
                            required
                            value={newPassword}
                            onChange={e => setNewPassword(e.target.value)}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            placeholder="Re-enter new password"
                            required
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <div className={styles.dividerLine}></div>

                    <button type="submit" className={styles.signInButton}>Reset Password</button>
                    
                    <div className={styles.dividerLine}></div>
                </form>
            </div>
        </div>
    );
}

export default ConfirmPasswordPage;
