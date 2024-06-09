import { fireAuth } from "./firebase";
import React, { useEffect } from "react";
import { GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider, EmailAuthProvider } from "firebase/auth";
import firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";  // FirebaseUIのCSSファイルのインポート

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
            signInFlow: 'popup'
        };

        const ui = new firebaseui.auth.AuthUI(fireAuth);
        ui.start('#firebaseui-auth-container', uiConfig);

    }, []); // 依存配列が正しく設定されているか確認

    return <div id="firebaseui-auth-container"></div>;
};



