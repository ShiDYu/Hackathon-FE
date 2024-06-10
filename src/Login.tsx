import { fireAuth } from "./firebase";
import React, { useEffect } from "react";
import { GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider, EmailAuthProvider } from "firebase/auth";
import * as firebaseui from 'firebaseui';
import "firebaseui/dist/firebaseui.css";

// グローバルオブジェクトにFirebaseUIインスタンスを追加するための宣言
declare global {
    interface Window {
        firebaseUiInstance?: firebaseui.auth.AuthUI;
    }
}

export const Login: React.FC = () => {
    useEffect(() => {
        const uiConfig = {
            signInSuccessUrl: '/',
            signInOptions: [
                GoogleAuthProvider.PROVIDER_ID,
                FacebookAuthProvider.PROVIDER_ID,
                GithubAuthProvider.PROVIDER_ID,
                EmailAuthProvider.PROVIDER_ID
            ],
            signInFlow: 'redirect',
        };

        // FirebaseUIのインスタンスが既に存在するかをチェック
        if (!window.firebaseUiInstance) {
            window.firebaseUiInstance = new firebaseui.auth.AuthUI(fireAuth);
        }
        
        // インスタンスが存在する場合、startを呼び出す
        window.firebaseUiInstance.start('#firebaseui-auth-container', uiConfig);

    }, []); 

    return <div id="firebaseui-auth-container"></div>;
};




