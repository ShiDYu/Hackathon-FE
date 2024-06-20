import React, { useEffect, useState } from 'react';
import { Box, Typography, Divider, IconButton, Button, Avatar } from '@mui/material';
import { fireAuth } from '../firebase';
import LikeButtonForreply from '../Like/LikesButtonForreply';
import ReplyForm from './replyformForReply';
import ReplyReplyCount from './replyCountForreply';
import ReplyIcon from '@mui/icons-material/Reply';
import DeleteReplyButton from './DeleteReply'; // リプライ削除ボタンをインポート

interface Reply {
    id: number;
    tweet_id: number | null;
    reply_id: number | null;
    uid: string;
    content: string;
    date: string; // ISO文字列として保存されていると仮定します
    nickname: string;
    avatarUrl: string; // アバターURLを追加
}

interface RepliesProps {
    replyId: number; // 親リプライID
}

export const RepliesToReply: React.FC<RepliesProps> = ({ replyId }) => {
    const [replies, setReplies] = useState<Reply[]>([]);
    const [openReplies, setOpenReplies] = useState<{ [key: number]: boolean }>({});
    const [userId, setUserId] = useState<string | null>(null);
    const [openReplyFormId, setOpenReplyFormId] = useState<number | null>(null);
    const [replyReplyCounts, setReplyReplyCounts] = useState<{ [key: number]: number }>({});

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
            try {
                const response = await fetch(`http://localhost:8000/replies/replies?reply_id=${replyId}`);
                if (response.ok) {
                    const data = await response.json();
                    setReplies(data || []); // nullの場合をハンドリング
                } else {
                    console.error('Failed to fetch replies');
                }
            } catch (error) {
                console.error('Error fetching replies:', error);
            }
        };

        fetchReplies();
    }, [replyId]);

    useEffect(() => {
        const fetchReplyReplyCounts = async () => {
            const counts: { [key: number]: number } = {};
            for (const reply of replies) {
                const response = await fetch(`http://localhost:8000/reply_replies/count?reply_id=${reply.id}`);
                if (response.ok) {
                    const data = await response.json();
                    counts[reply.id] = data.count;
                } else {
                    console.error(`Failed to fetch reply reply count for reply id ${reply.id}`);
                }
            }
            setReplyReplyCounts(counts);
        };

        fetchReplyReplyCounts();
    }, [replies]);

    const toggleReplies = (replyId: number) => {
        setOpenReplies((prev) => ({
            ...prev,
            [replyId]: !prev[replyId]
        }));
    };

    const handleReplyClick = (replyId: number) => {
        setOpenReplyFormId(replyId);
    };

    const handleReplyFormClose = () => {
        setOpenReplyFormId(null);
    };

    const handleDelete = (replyId: number) => {
        setReplies(replies.filter(reply => reply.id !== replyId));
    };

    return (
        <Box>
            {replies.map((reply: any) => (
                <Box key={reply.id} sx={{ mb: 2 }}>
                    <Divider />
                    <Box sx={{ p: 2, display: 'flex', alignItems: 'flex-start' }}>
                        <Avatar alt={reply.nickname} src={reply.avatar_url} sx={{ mt:1,width: 40, height: 40, mr: 2, border: '2px solid #1DA1F2', borderRadius: '50%' }} />
                        <Box>
                            <Typography variant="h6" component="div">
                                {reply.nickname}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                                {new Date(reply.createdAt).toLocaleString()}
                            </Typography>
                            <Typography variant="body1" sx={{ mt: 1 }}>
                                {reply.content}
                            </Typography>
                            <Box display="flex" alignItems="center" sx={{ mt: 1 }}>
                                <LikeButtonForreply replyId={reply.id} userId={userId || ""} />
                                <IconButton onClick={() => handleReplyClick(reply.id)} sx={{ ml: 1 }}>
                                    <ReplyIcon />
                                </IconButton>
                                <ReplyReplyCount replyId={reply.id} />
                                {replyReplyCounts[reply.id] > 0 && (
                                    <Button onClick={() => toggleReplies(reply.id)} sx={{ marginLeft: '16px' }}>
                                        {openReplies[reply.id] ? 'Hide Replies' : 'View Replies'}
                                    </Button>
                                )}
                                {userId === reply.uid && (
                                    <DeleteReplyButton replyId={reply.id} onDelete={handleDelete} sx={{ ml: 2 }}/>
                                )}
                            </Box>
                            {openReplies[reply.id] && (
                                <Box mt={2}>
                                    <RepliesToReply replyId={reply.id} />
                                </Box>
                            )}
                        </Box>
                    </Box>
                    <Divider />
                </Box>
            ))}
            {openReplyFormId !== null && (
                <ReplyForm replyId={openReplyFormId} open={openReplyFormId !== null} onClose={handleReplyFormClose} />
            )}
        </Box>
    );
};

export default RepliesToReply;
