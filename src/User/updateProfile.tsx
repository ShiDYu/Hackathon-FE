import React, { useState } from "react";
import { fireAuth } from "../firebase";
import { useNavigate } from "react-router-dom";
import './updateProfile.css'; // CSSをインポート
import ProfileCard from "../User/ProfileCard";
import { Sidebar } from "../sidebar/Sidebar";

export const Profile: React.FC = () => {
    const [nickname, setNickname] = useState("");
    const [bio, setBio] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

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
                    // プロフィール設定が成功したらツイート一覧に遷移
                    navigate('/tweets');
                } else {
                    console.error('プロフィールの設定に失敗しました。');
                }
            } catch (error) {
                console.error('Error updating profile:', error);
            }
        }
    };

    return (
        <div className="profile-page-container">
            <Sidebar/>
            <div className="profile-content">
                <ProfileCard />
                <div className="profile-container">
                    <div className="profile-header">
                        <h2>プロフィール設定</h2>
                        <button onClick={handleProfileUpdate}>保存</button>
                    </div>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <div className="profile-input-container">
                        <label>
                            Name
                            <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} />
                        </label>
                        <label>
                            Bio
                            <textarea value={bio} onChange={(e) => setBio(e.target.value)}></textarea>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;



//ナビゲーションのプロフィールボタンを教えたら、自分のプロフィールカードとeditボタンが表示される editボタンを押すと、プロフィール編集ページに遷移する
//アバターの自動生成を使ってアイコンを作成する　dicebearのapiを使ってアイコンを作成する　ローディングスピナーを使ってあたかも自動生成している感を出す

