import React, { useState } from "react";
import { fireAuth } from "../firebase";
import { useNavigate } from "react-router-dom";
import './setProfile.css'; // CSSをインポート
import LoadingSpinner from '../UIcom/LoadingSpinner'; // ローディングスピナーをインポート

export const FirstProfile: React.FC = () => {
    const [nickname, setNickname] = useState("");
    const [bio, setBio] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    console.log('API Base URL:', apiBaseUrl);

    const handleProfileUpdate = async () => {
        const user = fireAuth.currentUser;
        if (user) {
            if (nickname === "" ) {
                setErrorMessage('Nameを入力してください');
                return;
            }
            if (bio === "" ) {
                setErrorMessage('Bioを入力してください');
                return;
            }
            if (nickname.length > 30) {
                setErrorMessage('Nameは30文字以内で設定してください');
                return;
            }
            if (bio.length > 250) {
                setErrorMessage('Bioは250文字以内で設定してください');
                return;
            }
            const userInfo = {
                id: user.uid,
                nickname: nickname,
                bio: bio,
            };

            try {
                const response = await fetch(`${apiBaseUrl}/profile`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userInfo)
                });
                if (response.ok) {
                    // アバターの生成
                    // const avatarUrl = `https://api.dicebear.com/9.x/adventurer/svg?seed=${nickname}`;
                    const avatarUrl = `https://robohash.org/${nickname}?set=set4`;
                    
                    // アイコンとして保存（サーバーに送る等の処理を追加）
                    await saveAvatar(user.uid, avatarUrl);

                    // ローディングを開始して3秒後に/avatarに遷移
                    setLoading(true);
                    setTimeout(() => {
                        setLoading(false);
                        navigate('/avatar');
                    }, 2000);
                } else {
                    console.error('プロフィールの設定に失敗しました。');
                }
            } catch (error) {
                console.error('Error updating profile:', error);
            }
        }
    };

    // アバターを保存する関数（例：サーバーに送信）
    const saveAvatar = async (userId: string, avatarURL: string) => {
        try {
            const response = await fetch(`${apiBaseUrl}/save-avatar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId: userId, avatarURL: avatarURL })
            });
            if (!response.ok) {
                throw new Error('アバターの保存に失敗しました。');
            }
        } catch (error) {
            console.error('Error saving avatar:', error);
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleProfileUpdate();
        }
    };


    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="profile-container">
            <div className="profile-header">
                <h2>プロフィール設定</h2>
                <button onClick={handleProfileUpdate}>保存</button>
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="profile-input-container">
                <label>
                    Name
                    <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} onKeyPress={handleKeyPress} />
                </label>
                <label>
                    Bio
                    <textarea value={bio} onChange={(e) => setBio(e.target.value)} onKeyPress={handleKeyPress}></textarea>
                </label>
            </div>
        </div>
    );
};

export default FirstProfile;



