import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLoginButton } from 'react-social-login-buttons';
import { signInWithGoogle, signUpWithEmail } from '../firebase';
import './SignUp.css'; // カスタムCSSをインポート

export const SignUp: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleGoogleSignUp = async () => {
        try {
            const result = await signInWithGoogle();
            const uid = result.user.uid;
            await sendUidToBackend({ id: uid });
            navigate('/profile');
        } catch (error) {
            console.error('Error signing up with Google:', error);
        }
    };

    const handleEmailSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = await signUpWithEmail(email, password);
            const uid = result.user.uid;
            await sendUidToBackend({ id: uid });
            navigate('/profile');
        } catch (error) {
            console.error('Error signing up with email:', error);
        }
    };

    const sendUidToBackend = async (userInfo: { id: string }) => {
        console.log('Sending UID to backend:', userInfo); // ここでログを出力
        try {
            const response = await fetch('http://localhost:8000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userInfo)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log('Backend response:', data);
        } catch (error) {
            console.error('Error sending UID to backend:', error);
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-card">
                <h2>Sign Up</h2>
                <GoogleLoginButton onClick={handleGoogleSignUp} />
                {/*サインアップの時はsignup with googlenにするためのカスタマイズボタンを作る*/}
                <form onSubmit={handleEmailSignUp}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
};

