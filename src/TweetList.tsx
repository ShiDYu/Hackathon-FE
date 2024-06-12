import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const TweetList: React.FC = () => {
    const [tweets, setTweets] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // ツイートのリストをサーバーから取得
        const fetchTweets = async () => {
            const response = await fetch('http://localhost:8000/tweets');
            const data = await response.json();
            setTweets(data);
        };

        fetchTweets();
    }, []);
    const handleCreateTweet = () => {
        navigate('/create-tweet');
    };

    return (
        <div>
            <h2>ツイート一覧</h2>
            <button onClick={handleCreateTweet}>ツイートを作成</button>
            <ul>
                {tweets.map((tweet: any) => (
                    <li key={tweet.id}>{tweet.content}</li>
                ))}
            </ul>
        </div>
    );
};

export default TweetList;

// 追加する機能: ツイートが時系列順に表示される機能、ツイートにユーザー名などが表示されるようにする、ツイートの投稿機能、ツイートの削除機能、ツイートの編集機能、