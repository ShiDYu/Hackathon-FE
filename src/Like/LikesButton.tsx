import React from "react";
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState, useEffect } from 'react';
import internal from "stream";

interface LikeButtonProps {
    postId: number;
    userId: string;
  }

export const LikeButton:React.FC<LikeButtonProps>= ({ postId , userId }) => {
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);

    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  
    useEffect(() => {
      console.log('postId:', postId, 'userId:', userId);

      const fetchLikes = async () => {
          if (!userId) {
              console.warn('userId is empty. Skipping fetchLikes.');
              return;
          }

          try {
              const response = await fetch(`${apiBaseUrl}/posts/likes?userId=${userId}&postId=${postId}`);
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              const data = await response.json();
              setLiked(data.likedByUser);
              setLikeCount(data.likeCount);
              console.log('data:', data);
          } catch (error) {
              console.error('Error fetching likes:', error);
          }
      };

      fetchLikes();
  }, [postId, userId]);
    // いいねしたユーザーのIDといいね数の取得　多分uidとれてきてない

  
    const toggleLike = () => {
      console.log('userId:', userId, 'postId:', postId, 'liked:', liked);　// いいねの状態を確認
      console.log(`$typeof userId: ${typeof userId}, typeof postId: ${typeof postId}`);
      const url = liked ? `${apiBaseUrl}/posts/unlike` : `${apiBaseUrl}/posts/like`;
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        
        body: JSON.stringify({ postId:Number(postId), userId:userId })
        // postIdがここでstringになっている

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
  
// 修正するエラー
// １、ツイート一覧ページを開いた時に、いいねの数が表示されない
// 2、いいねボタンを押したのにリロードするといいねが解除されている　データベースには保存されているので次に押すとエラーが発生する
// done エラー解消済み