import React, { useState } from "react";
import { fireAuth } from "../firebase";
import { useNavigate } from "react-router-dom";

export const CreateTweet: React.FC = () => {
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    const handleCreateTweet = async () => {
        const user = fireAuth.currentUser;
        if (user) {
            const tweetInfo = {
                uid: user.uid,
                content: content,
            };

            try {
                const response = await fetch('http://localhost:8000/create-tweet', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(tweetInfo)
                });
                if (response.ok) {
                    navigate('/tweets'); // ツイート作成が成功したらツイート一覧に遷移
                } else {
                    console.error('uid:', user.uid);
                    console.error('ツイートの作成に失敗しました。');
                }
            } catch (error) {
                console.error('Error creating tweet:', error);
            }
        }
    };

    return (
        <div>
            <h2>ツイートする</h2>
            <div>
                <label>
                    内容:
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} />
                </label>
            </div>
            <button onClick={handleCreateTweet}>ツイート</button>
        </div>
    );
};

