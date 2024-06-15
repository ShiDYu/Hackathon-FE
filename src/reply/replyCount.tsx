import React, { useEffect, useState } from 'react';
import ReplyForm from './replyform';
import Replies from './reply';

interface TweetProps {
    tweetId: string;
}


export const ReplyCount : React.FC<TweetProps>= ({ tweetId }) => {
  const [replyCount, setReplyCount] = useState(0);

  useEffect(() => {
    const fetchReplyCount = async () => {
      const response = await fetch(`http://localhost:8000/reply/count?tweet_id=${tweetId}`);
      if (response.ok) {
        const data = await response.json();
        setReplyCount(data.count);
      } else {
        console.error('Failed to fetch reply count');
      }
    };

    fetchReplyCount();
  }, [tweetId]);

 
  return (
    <div>
      <p>{replyCount}</p>
    </div>
  );
};
