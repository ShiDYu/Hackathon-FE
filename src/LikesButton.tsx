import React from "react";
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState, useEffect } from 'react';

interface LikeButtonProps {
    postId: string;
    userId: string;
  }

export const LikeButton:React.FC<LikeButtonProps>= ({ postId , userId }) => {
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
  
    useEffect(() => {
      if (!userId) return;  // userId が存在しない場合は何もしない
  
      const fetchLikes = async () => {
        try {
          const response = await fetch(`http://localhost:8000/posts/${postId}/likes?userId=${userId}`);
          const data = await response.json();
          setLiked(data.likedByUser);
          setLikeCount(data.likeCount);
        } catch (error) {
          console.error('Error fetching likes:', error);
        }
      };
  
      fetchLikes();
    }, [postId, userId]);
  
    const toggleLike = () => {
      const url = liked ? `http://localhost:8000/posts/${postId}/unlike` : `http://localhost:8000/posts/${postId}/like`;
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId })
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
        {/* なぜかまたCORSがうまくいかない */}
      </div>
    );
  };
  