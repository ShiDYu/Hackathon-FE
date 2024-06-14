import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Group, Paper, Text, Title } from "@mantine/core";
import { Sidebar } from "./Sidebar";
import { LikeButton } from "./LikesButton";
import { fireAuth } from "./firebase";
import {ReplyComponent} from "./replyform";


interface Tweet {
    id: string;
    uid: string;
    content: string;
    date: string; // dateはISO文字列として保存されていると仮定します
    nickname: string;
  }

export const TweetList: React.FC = () => {
    const [tweets, setTweets] = useState([]);
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
      <div style={{ display: 'flex' }}>
      <Sidebar />
      <Container size="md" my="md" style={{ marginLeft: '260px', flex: 1 }}>
        <Title order={2} mb="md">ツイート一覧</Title>
        <Button onClick={handleCreateTweet} mb="md">ツイートを作成</Button>
        {sortedTweets.map((tweet: any) => (
          <Paper key={tweet.id} shadow="sm" p="md" withBorder style={{ border: '1px solid #ddd', width: '100%', marginBottom: '16px' }}>
            <Group align="flex-start">
              <div>
                <Text style={{ fontWeight: 500 }}>{tweet.nickname}</Text>
                <Text size="xs" color="dimmed">{new Date(tweet.date).toLocaleString()}</Text>
                <Text>{tweet.content}</Text>
                <LikeButton postId={tweet.id} userId={userId || ""}/>
                <ReplyComponent tweetId={tweet.id}/>
              </div>
            </Group>
          </Paper>
        ))}
      </Container>
    </div>
    );
};

export default TweetList;

// 追加する機能: ツイートが時系列順に表示される機能、ツイートにユーザー名などが表示されるようにする、ツイートの投稿機能、ツイートの削除機能、ツイートの編集機能、