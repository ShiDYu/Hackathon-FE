import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLoginButton } from 'react-social-login-buttons';
import { signInWithGoogle, signUpWithEmail } from '../firebase';
import './SignUp.css'; // カスタムCSSをインポート
import { Link } from 'react-router-dom';

export const SignUp: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

    const handleGoogleSignUp = async () => {
        try {
            const result = await signInWithGoogle();
            const uid = result.user.uid;
            await sendUidToBackend({ id: uid });
            navigate('/set-first-profile');
        } catch (error) {
            console.error('Error signing up with Google:', error);
            setErrorMessage('Googleでのサインアップに失敗しました');
        }
    };

    const handleEmailSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password.length < 6) {
            setErrorMessage('パスワードは6文字以上である必要があります');
            return;
        }
        try {
            const result = await signUpWithEmail(email, password);
            const uid = result.user.uid;
            await sendUidToBackend({ id: uid });
            navigate('/set-first-profile');
        } catch (error: any) {
            console.error('Error signing up with email:', error);
            setErrorMessage('メールでのサインアップに失敗しました');
        }
    };

    const sendUidToBackend = async (userInfo: { id: string }) => {
        console.log('Sending UID to backend:', userInfo); // ここでログを出力
        try {
            const response = await fetch(`${apiBaseUrl}/register`, {
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
                <h2>新規登録</h2>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <GoogleLoginButton onClick={handleGoogleSignUp} />
                <div className="separator"></div>
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
                    <button type="submit">登録</button>
                    <Link to={`/`}>ログインはこちら</Link>
                </form>
            </div>
        </div>
    );
};

export default SignUp;


//メールアドレスでサインアップするときパスワードが６文字以上でないとエラーが出るのでバリデーションをする　done
//メールアドレスを本当に所持しているかverifyする
//様々なエラーのハンドリング
