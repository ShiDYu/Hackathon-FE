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

    useEffect(() => {
        const fetchLikes = async () => {
            try {
                const response = await fetch(`http://localhost:8000/replies/likes?userId=${userId}&replyId=${replyId}`);
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
        const url = liked ? `http://localhost:8000/replies/unlike` : `http://localhost:8000/replies/like`;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ replyId: Number(replyId), userId })
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
