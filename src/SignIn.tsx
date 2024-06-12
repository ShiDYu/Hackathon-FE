import { fireAuth } from "./firebase";
import React, { useEffect } from "react";
import { GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider, EmailAuthProvider,  onAuthStateChanged } from "firebase/auth";
import * as firebaseui from 'firebaseui';
import "firebaseui/dist/firebaseui.css"; // デフォルトのCSS
import { useNavigate } from "react-router-dom";

declare global {
    interface Window {
        firebaseUiInstance?: firebaseui.auth.AuthUI;
    }
}

export const SignIn: React.FC = () => {
    const navigate = useNavigate(); // React Router v6 の useNavigate フックを使用

    useEffect(() => {
        const uiConfig = {
            signInSuccessUrl: '/profile',  // サインイン成功後のリダイレクト先
            signInOptions: [
                GoogleAuthProvider.PROVIDER_ID,
                FacebookAuthProvider.PROVIDER_ID,
                GithubAuthProvider.PROVIDER_ID,
                EmailAuthProvider.PROVIDER_ID
            ],
            signInFlow: 'popup',
            callbacks: {
                signInSuccessWithAuthResult: (authResult: any, redirectUrl: string) => {
                    // サインイン成功時に呼び出される
                    const uid = authResult.user.uid;
                    sendUidToBackend({ id: uid });
                    navigate('/profile'); // プログラム的にプロフィールページにリダイレクト
                    return false; // デフォルトのリダイレクトを防ぐ
                },
            },
        };

        if (!window.firebaseUiInstance) {
            window.firebaseUiInstance = new firebaseui.auth.AuthUI(fireAuth);
        }

        window.firebaseUiInstance.start('#firebaseui-auth-container', uiConfig);

        onAuthStateChanged(fireAuth, (user) => {
            if (user) {
                const uid = user.uid;
                sendUidToBackend({ id: uid });
            }
        });
    }, [navigate]);

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
        <div className="auth-container">
            <div id="firebaseui-auth-container"></div>
        </div>
    );
};

