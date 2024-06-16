// TweetPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Tweet {
  id: number;
  user_id: number;
  content: string;
  created_at: string;
  updated_at: string;
  parent_tweet_id?: number;
}

interface Params {
  id: string;
}

export const TweetPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
  const [tweet, setTweet] = useState<Tweet | null>(null);
  const [replies, setReplies] = useState<Tweet[]>([]);

  useEffect(() => {
    const fetchTweet = async () => {
      const response = await fetch(`http://localhost:8000/repliedTweet?tweet_id=${id}`);
      if (response.ok) {
        const data: Tweet = await response.json();
        setTweet(data);
      } else {
        console.error('Failed to fetch tweet');
      }
    };

    const fetchReplies = async () => {
      const response = await fetch(`http://localhost:8000/replies?tweet_id=${id}`);
      if (response.ok) {
        const data: Tweet[] = await response.json();
        setReplies(data);
      } else {
        console.error('Failed to fetch replies');
      }
    };

    fetchTweet();
    fetchReplies();
  }, [id]);

  if (!tweet) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Tweet</h1>
      <p>{tweet.content}</p>
      <h2>Replies</h2>
      {replies.map((reply) => (
        <div key={reply.id}>
          <p>{reply.content}</p>
        </div>
      ))}
    </div>
  );
};

export default TweetPage;

//返信を見れるようにする