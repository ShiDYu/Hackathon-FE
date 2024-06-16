import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Typography, Paper, Box } from "@mui/material";
import { Sidebar } from "../sidebar/Sidebar";
import { LikeButton } from "../Like/LikesButton";
import { fireAuth } from "../firebase";
import { ReplyComponent } from "../reply/replyform";
import { Link } from 'react-router-dom';
import { ReplyCount } from "../reply/replyCount";
import './TweetList.css'; // CSSをインポート
import {FloatingActionButton} from '../Tweet/FloatingActionButton';

interface Tweet {
    id: number;
    uid: string;
    content: string;
    date: string; // dateはISO文字列として保存されていると仮定します
    nickname: string;
}

export const TweetList: React.FC = () => {
    const [tweets, setTweets] = useState<Tweet[]>([]);
    const navigate = useNavigate();
    const user = fireAuth.currentUser;
    const userId = user?.uid;

    useEffect(() => {
        // ツイートのリストをサーバーから取得
        const fetchTweets = async () => {
            const response = await fetch('http://localhost:8000/tweets');
            const data = await response.json();
            setTweets(data);
        };

        fetchTweets();
    }, []);

    const sortedTweets = tweets.sort((a: Tweet, b: Tweet) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const handleCreateTweet = () => {
        navigate('/create-tweet');
    };

    return (
        <Box display="flex">
            <Sidebar />
            <Container maxWidth="md" sx={{ ml: '260px', flex: 1, my: 2 }}>
                <Typography variant="h4" component="h2" gutterBottom>
                    ツイート一覧
                </Typography>
                <Box>
                    {sortedTweets.map((tweet: any) => (
                        <Paper key={tweet.id} variant="outlined" sx={{ p: 2, mb: 2 }}>
                            <Typography variant="h6" component="div">
                                {tweet.nickname}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                                {new Date(tweet.date).toLocaleString()}
                            </Typography>
                            <Typography variant="body1" sx={{ mt: 1 }}>
                                {tweet.content}
                            </Typography>
                            <Box display="flex" alignItems="center" sx={{ mt: 1 }}>
                                <LikeButton postId={tweet.id} userId={userId || ""} />
                                <ReplyCount tweetId={tweet.id} />
                                <Link to={`/tweet/${tweet.id}`} style={{ marginLeft: '16px', color: '#1DA1F2', textDecoration: 'none' }}>
                                    返信を見る
                                </Link>
                            </Box>
                            <ReplyComponent tweetId={tweet.id} />
                        </Paper>
                    ))}
                </Box>
            </Container>
            <FloatingActionButton onClick={handleCreateTweet} />å
        </Box>
    );
};

export default TweetList;




// 追加する機能: ツイートが時系列順に表示される機能、ツイートにユーザー名などが表示されるようにする、ツイートの投稿機能、ツイートの削除機能、ツイートの編集機能、