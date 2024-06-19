import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fireAuth } from "../firebase";
import './Avatar.css'; // CSSをインポート

export const Avatar: React.FC = () => {
    const [avatarUrl, setAvatarUrl] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAvatar = async () => {
            const user = fireAuth.currentUser;
            if (user) {
                try {
                    const response = await fetch(`http://localhost:8000/avatar?userId=${user.uid}`);
                    if (response.ok) {
                        const data = await response.json();
                        setAvatarUrl(data.avatarUrl);
                    } else {
                        console.error('アバターの取得に失敗しました。');
                    }
                } catch (error) {
                    console.error('Error fetching avatar:', error);
                }
            }
        };
        fetchAvatar();
    }, []);

    return (
        <div className="avatar-container">
            <h2 className="YourAvatar">あなたのアバター</h2>
            {avatarUrl ? (
                <img src={avatarUrl} alt="Avatar" className="Avatar"/>
            ) : (
                <p>アバターを読み込んでいます...</p>
            )}
            <button onClick={() => navigate('/tweets')}>ホームへ</button>
        </div>
    );
};

export default Avatar;
