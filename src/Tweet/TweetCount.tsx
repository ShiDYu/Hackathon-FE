import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, CircularProgress } from "@mui/material";
import { fireAuth } from "../firebase";

export const TodayTweetCount: React.FC = () => {
    const [tweetCount, setTweetCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState<string | null>(null);

    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

    useEffect(() => {
        const unsubscribe = fireAuth.onAuthStateChanged(user => {
            if (user) {
                setUserId(user.uid);
            } else {
                console.error('ユーザーがログインしていません。');
                setLoading(false); // ローディングを停止
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (userId) {
            const fetchTweetCount = async () => {
                try {
                    const response = await fetch(`${apiBaseUrl}/today-count?userId=${userId}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            // "Authorization": `Bearer ${localStorage.getItem("token")}`
                        }
                    });
                    const data = await response.json();
                    setTweetCount(data.tweet_count);
                    console.log(data.tweet_count);
                } catch (error) {
                    console.error("Error fetching tweet count:", error);
                } finally {
                    setLoading(false);
                }
            };

            fetchTweetCount();
        }
    }, [userId]);

    return (
        <Box
            sx={{
                position: 'fixed',
                top: 60,
                right: 30,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#1DA1F2', // 背景色を設定する場合
                padding: 2,
                borderRadius: 2,
                boxShadow: 3,
            }}
        >
            <Card sx={{ maxWidth: 200 }}>
                <CardContent>
                    <Typography variant="h5" component="div" gutterBottom>
                        今日のあなたの
                    </Typography>
                    <Typography variant="h5" component="div" gutterBottom sx={{display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',}}>
                        ツイート数
                    </Typography>
                    
                    {loading ? (
                        <Box display="flex" justifyContent="center" alignItems="center" height="100px">
                            <CircularProgress />
                        </Box>
                    ) : (
                        <Typography variant="h5" component="div" sx={{display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',}}>
                            {tweetCount} ツイート
                        </Typography>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
}

export default TodayTweetCount;
