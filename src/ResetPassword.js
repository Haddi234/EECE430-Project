import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css';

function ResetPasswordPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('https://jnw74bbisj.execute-api.eu-north-1.amazonaws.com/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email })
            });

            const data = await response.json();
            if (response.status === 200) {
                setMessage('A verification code has been sent to your email!');
                setTimeout(() => {
                    navigate('/confirm');  // Redirect to Reset Password page
                }, 2000);
            } else {
                setMessage(`Error: ${data.message || 'Something went wrong.'}`);
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
                <h1 className={styles.loginHeader}>Forgot Password</h1>
                
                <div className={styles.welcomeSection}>
                    <p className={styles.welcomeMessage}>
                        Enter your email to receive a verification code to reset your password.
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

                    <div className={styles.dividerLine}></div>

                    <button type="submit" className={styles.signInButton}>Send Verification Code</button>
                    
                    <div className={styles.dividerLine}></div>
                </form>
            </div>
        </div>
    );
}

export default ResetPasswordPage;
