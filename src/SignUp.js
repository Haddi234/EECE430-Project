import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css';
import { Link } from 'react-router-dom';

function SignUpPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const validatePassword = (password) => {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        if (password.length < minLength) return 'Password must be at least 8 characters';
        if (!hasUpperCase) return 'Password needs at least one uppercase letter';
        if (!hasLowerCase) return 'Password needs at least one lowercase letter';
        if (!hasNumber) return 'Password needs at least one number';
        if (!hasSpecialChar) return 'Password needs at least one special character';
        return null;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }

        const passwordError = validatePassword(password);
        if (passwordError) {
            setMessage(passwordError);
            return;
        }

        try {
            // Call your backend API to sign up the user via Cognito
            const response = await fetch('https://qcs9j12so8.execute-api.eu-north-1.amazonaws.com/new', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, confirmPassword })
            });

            const data = await response.json();

            if (!response.ok) {
                // Handle error from Cognito (e.g., password not conforming to policy)
                const errorMsg = data.body?.includes('Password did not conform')
                    ? data.body.match(/Password did not conform with policy: (.+)/)?.[1]
                    : 'Signup failed. Please try again.';
                setMessage(errorMsg);
                return;
            }

            setMessage('Account created! A confirmation code has been sent to your email.');
            setTimeout(() => {
                // Pass email to VerifyEmailPage via navigate state
                navigate('/verify', { state: { email } });  // Redirect to the email verification page and pass the email
            }, 2000);

        } catch (error) {
            setMessage('Network error. Please try again.');
            console.error('Error:', error);
        }
    };

    return (
        <div className={styles.loginPageContainer}>
            <div className={styles.topRightArc}></div>
            
            <div className={styles.loginContent}>
                <h1 className={styles.loginHeader1}>Create Account!</h1>
                
                <div className={styles.welcomeSection}>
                    <p className={styles.welcomeMessage}>
                        Simplify your medical <br />scheduling experience!
                    </p>
                    <div className={styles.dividerLine}></div>
                </div>

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

                    <div className={styles.inputGroup}>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            placeholder="Re-enter your password"
                            required
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <div className={styles.dividerLine}></div>

                    <div className={styles.messageContainer}>
                        {message && <p className={styles.simpleMessage}>{message}</p>}
                    </div>

                    <button type="submit" className={styles.signInButton}>Sign Up</button>
                    
                    <div className={styles.dividerLine}></div>
                </form>

                <div className={styles.createAccount}>
                    <Link to="/login" className={styles.linkStyle}>
                        <p>Already have an account?</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default SignUpPage;
