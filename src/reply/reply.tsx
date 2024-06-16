import React, { useEffect, useState } from 'react';
import { Paper, Typography, Box, Divider } from '@mui/material';
import { LikeButton } from '../Like/LikesButton';
import { fireAuth } from '../firebase';

interface Reply {
    id: number;
    uid: string;
    content: string;
    date: string; // dateはISO文字列として保存されていると仮定します
    nickname: string;
}

interface ParentTweetProps {
    tweetId: string;
}

export const Replies: React.FC<ParentTweetProps> = ({ tweetId }) => {
    const [replies, setReplies] = useState<Reply[]>([]);
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = fireAuth.onAuthStateChanged(user => {
            if (user) {
                setUserId(user.uid);
            } else {
                setUserId(null);
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const fetchReplies = async () => {
            const response = await fetch(`http://localhost:8000/replies?tweet_id=${tweetId}`);
            if (response.ok) {
                const data = await response.json();
                setReplies(data);
            } else {
                console.error('Failed to fetch replies');
            }
        };

        fetchReplies();
    }, [tweetId]);

    return (
        <div>
            {replies.map((reply: Reply) => (
                <div key={reply.id}>
                    <Divider />
                    <Box sx={{ p: 2 }}>
                        <Typography variant="h6" component="div">
                            {reply.nickname}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                            {new Date(reply.date).toLocaleString()}
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 1 }}>
                            {reply.content}
                        </Typography>
                        {/* <Box display="flex" alignItems="center" sx={{ mt: 1 }}>
                            <LikeButton postId={reply.id} userId={userId || ""} />
                        </Box> */}
                    </Box>
                    <Divider />
                </div>
            ))}
        </div>
    );
};

export default Replies;
