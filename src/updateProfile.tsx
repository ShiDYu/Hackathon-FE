import React, { useState } from "react";
import { fireAuth } from "./firebase";

export const Profile: React.FC = () => {
    const [nickname, setNickname] = useState("");
    const [bio, setBio] = useState("");

    const handleProfileUpdate = async () => {
        const user = fireAuth.currentUser;
        if (user) {
            const userInfo = {
                id: user.uid,
                nickname: nickname,
                bio: bio,
            };

            try {
                const response = await fetch('http://localhost:8080/update', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userInfo)
                });
                const data = await response.json();
                console.log('Backend response:', data);
            } catch (error) {
                console.error('Error updating profile:', error);
            }
        }
    };

    return (
        <div>
            <h2>プロフィール設定</h2>
            <div>
                <label>
                    アカウントに表示するニックネームを入力してください:
                    <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} />
                </label>
            </div>
            <div>
                <label>
                    プロフィールを入力してください:
                    <input type="number" value={bio} onChange={(e) => setBio(e.target.value)} />
                </label>
            </div>
            <button onClick={handleProfileUpdate}>プロフィールを設定</button>
        </div>
    );
};

