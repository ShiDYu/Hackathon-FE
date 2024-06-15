import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLoginButton } from 'react-social-login-buttons';
import { signInWithGoogle, signInWithEmail } from '../firebase';
import './SignIn.css';

// サインイン画面に登録が済んでいないユーザーはこちらみたいなボタンを作りたい

export const SignIn: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleGoogleSignIn = async () => {
    try {
        await signInWithGoogle();
        navigate('/tweets');
    } catch (error) {
        console.error('Error signing in with Google:', error);
    }
};

    const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        await signInWithEmail(email, password);
        navigate('/tweets');
    } catch (error) {
        console.error('Error signing in with email:', error);
    }
    };

    return (
    <div className="signin-container">
        <div className="signin-card">
        <h2>Sign In</h2>
        <GoogleLoginButton onClick={handleGoogleSignIn} />
        <form onSubmit={handleEmailSignIn}>
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
            <button type="submit">Sign In</button>
        </form>
        </div>
    </div>
);
};


