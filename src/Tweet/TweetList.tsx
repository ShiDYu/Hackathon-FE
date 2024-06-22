import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Paper, Box, Button, Avatar } from "@mui/material";
import { Sidebar } from "../sidebar/Sidebar";
import { LikeButton } from "../Like/LikesButton";
import { fireAuth } from "../firebase";
import { ReplyComponent } from "../reply/replyform";
import { ReplyCount } from "../reply/replyCount";
import FloatingActionButton from './FloatingActionButton';
import Replies from "../reply/reply";
import './TweetList.css'; // CSSをインポート
import ProfileCard from "../User/ProfileCard"; // プロフィールカードをインポート
import DeleteTweetButton from './DeleteTweet'; // デリートボタンをインポート
import EditTweetButton from './EditTweet'; // 編集ボタンをインポート
import {TodayTweetCount} from './TweetCount'; // ツイート数を表示するコンポーネントをインポート

interface Tweet {
  id: number;
  uid: string;
  content: string;
  date: string; // dateはISO文字列として保存されていると仮定します
  nickname: string;
  avatarURL: string; // アイコンのURLを追加
}

export const TweetList: React.FC = () => {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [openReplies, setOpenReplies] = useState<{ [key: string]: boolean }>({});
  const [replyCounts, setReplyCounts] = useState<{ [key: number]: number }>({});
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);

  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

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
    const fetchTweets = async () => {
      const response = await fetch(`${apiBaseUrl}/tweets`);
      const data = await response.json();
      console.log(data);
      setTweets(data);
    };

    fetchTweets();
  }, []);

  const sortedTweets = tweets.sort((a: Tweet, b: Tweet) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const handleCreateTweet = () => {
    navigate('/create-tweet');
  };

  const toggleReplies = (tweetId: number) => {
    setOpenReplies((prev) => ({
      ...prev,
      [tweetId]: !prev[tweetId]
    }));
  };

  const handleReplyCount = (tweetId: number, count: number) => {
    setReplyCounts(prev => ({
      ...prev,
      [tweetId]: count
    }));
  };

  const handleDelete = (tweetId: number) => {
    setTweets(tweets.filter(tweet => tweet.id !== tweetId));
  };

  const handleSave = (tweetId: number, newContent: string) => {
    setTweets(tweets.map(t => t.id === tweetId ? { ...t, content: newContent } : t));
  };
  const formatTweetContent = (content: string) => {
    return content.split('\n').map((line, index) => (
        <span key={index}>
            {line}
            <br />
        </span>
    ));
};

  return (
    <Box display="flex">
      <Sidebar />
      <TodayTweetCount />
      <Container maxWidth="md" sx={{ ml: '260px', flex: 1, my: 2, backgroundColor: '#f0f0f0' }}>
        <ProfileCard /> {/* プロフィールカードを追加 */}
        <Box>
          {sortedTweets.map((tweet: any) => (
            <Paper key={tweet.id} variant="outlined" sx={{ p: 2, mb: 2 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box display="flex" alignItems="center">
                  <Avatar alt={tweet.nickname} src={tweet.avatar_url} sx={{
                    width: 40, height: 40, mr: 2, border: '2px solid #1DA1F2',
                    borderRadius: '50%'
                  }} />
                  <Box>
                    <Typography variant="h6" component="div">
                      {tweet.nickname}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {new Date(tweet.date).toLocaleString()}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Typography variant="body1" sx={{ mt: 1 }}>
                {formatTweetContent(tweet.content)}
              </Typography>
              <Box display="flex" alignItems="center" sx={{ mt: 1 }}>
                <LikeButton postId={tweet.id} userId={userId || ""} />
                <Box display="flex" alignItems="center" sx={{ ml: 2 }}>
                  <ReplyComponent tweetId={tweet.id.toString()} initialContent={tweet.content} />
                  <ReplyCount tweetId={tweet.id} onReplyCount={(count) => handleReplyCount(tweet.id, count)} />
                </Box>
                {replyCounts[tweet.id] > 0 && (
                  <Button
                    onClick={() => toggleReplies(tweet.id)}
                    sx={{ marginLeft: '16px' }}
                  >
                    {openReplies[tweet.id] ? 'Hide Replies' : 'View Replies'}
                  </Button>
                )}
                {userId === tweet.uid && ( // 自分のツイートにのみデリートボタンを表示
                  <DeleteTweetButton tweetId={tweet.id} onDelete={handleDelete} sx={{ ml: 2.5 }} /> // スタイルを直接追加
                )}
                {userId === tweet.uid && ( // 自分のツイートにのみ編集ボタンを表示
                  <EditTweetButton tweetId={tweet.id} initialContent={tweet.content} onSave={handleSave} />
                )}
              </Box>
              {openReplies[tweet.id] && (
                <Box mt={2}>
                  <Replies tweetId={tweet.id.toString()} />
                </Box>
              )}
            </Paper>
          ))}
        </Box>
      </Container>
      <FloatingActionButton onClick={handleCreateTweet} />
    </Box>
  );
};

export default TweetList;













// 追加する機能: ツイートが時系列順に表示される機能、ツイートにユーザー名などが表示されるようにする、ツイートの投稿機能、ツイートの削除機能、ツイートの編集機能、
// Headerにログインしているユーザーの名前やアイコンを表示する