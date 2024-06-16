import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLoginButton } from 'react-social-login-buttons';
import { signInWithGoogle, signInWithEmail } from '../firebase';
import './SignIn.css';
import { Link } from 'react-router-dom';


export const SignIn: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

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
    if (password.length < 6) {
        setErrorMessage('パスワードは6文字以上です');
        return;
    }
    try {
        await signInWithEmail(email, password);
        navigate('/tweets');
    } catch (error: any) {
        if (error.code === 'auth/user-not-found') {
            setErrorMessage('新規登録してください');
        } else if (error.code === 'auth/wrong-password') {
            setErrorMessage('パスワードが間違っています');
        } else {
            setErrorMessage('ログインに失敗しました');
        }
        }
    };

    return (
    <div className="signin-container">
        <div className="signin-card">
        <h2>ログイン</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <GoogleLoginButton onClick={handleGoogleSignIn} />
        <div className="separator"></div>
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
            <button type="submit">ログイン</button>
            <Link to={`/signup`}>新規登録はこちら</Link>
        </form>
        </div>
    </div>
);
};

// ローディングスピナーを追加する


