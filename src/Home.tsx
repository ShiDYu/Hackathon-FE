import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Home: React.FC = () => {
    const navigate = useNavigate();


    return (
        <div>
            <h2>Welcome to Our App</h2>
            <button onClick = {()=>navigate("/login")}>ログイン</button>
            <button onClick = {()=>navigate("/signup")}>サインアップ</button>
        </div>
    );
    };
