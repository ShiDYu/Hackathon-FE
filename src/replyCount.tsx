import React, { useEffect, useState } from 'react';
import ReplyForm from './replyform';
import Replies from './reply';

interface TweetProps {
    tweet: {
        id: string;
        content: string;
    };
}


const Tweet : React.FC<TweetProps>= ({ tweet }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyCount, setReplyCount] = useState(0);

  useEffect(() => {
    const fetchReplyCount = async () => {
      const response = await fetch(`http://localhost:8000/tweets/${tweet.id}/replies/count`);
      if (response.ok) {
        const data = await response.json();
        setReplyCount(data.count);
      } else {
        console.error('Failed to fetch reply count');
      }
    };

    fetchReplyCount();
  }, [tweet.id]);

  const handleReplyClick = () => {
    setShowReplyForm(!showReplyForm);
  };

  return (
    <div>
      <p>{tweet.content}</p>
      <button onClick={handleReplyClick}>Reply ({replyCount})</button>
      {showReplyForm && <ReplyForm tweetId={tweet.id} />}
    </div>
  );
};

export default Tweet;