import React, { useState, useEffect } from "react";
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface LikeButtonProps {
    replyId: number;
    userId: string;
}

export const LikeButtonForreply: React.FC<LikeButtonProps> = ({ replyId, userId }) => {
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);

    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

    useEffect(() => {
        const fetchLikes = async () => {
            console.log('replyId:', replyId, 'userId:', userId);
            console.log(`$typeof userId: ${typeof userId}, typeof replyId: ${typeof replyId}`);
            replyId = Number(replyId);
            console.log(`$typeof userId: ${typeof userId}, typeof replyId: ${typeof replyId}`);
            try {
                const response = await fetch(`${apiBaseUrl}/replies/likes?userId=${userId}&replyId=${replyId}`);
                const data = await response.json();
                setLiked(data.likedByUser);
                setLikeCount(data.likeCount);
            } catch (error) {
                console.error('Error fetching likes:', error);
            }
        };

        fetchLikes();
    }, [replyId, userId]);

    const toggleLike = () => {
        console.log('userId:', userId, 'replyId:', replyId, 'liked:', liked);
        console.log(`$typeof userId: ${typeof userId}, typeof replyId: ${typeof replyId}`);
        const url = liked ? `${apiBaseUrl}/replies/unlike` : `${apiBaseUrl}/replies/like`;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ replyId: Number(replyId), uid:userId })
        })
        .then(response => response.json())
        .then(data => {
            setLiked(!liked);
            setLikeCount(data.likeCount);
        })
        .catch(error => console.error('Error toggling like:', error));
    };

    return (
        <div>
            <IconButton onClick={toggleLike} color={liked ? 'error' : 'default'}>
                {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
            <span>{likeCount}</span>
        </div>
    );
};

export default LikeButtonForreply;

//いいねを押すとDBには蓄積される
