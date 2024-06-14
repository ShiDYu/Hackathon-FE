import React, { useEffect, useState } from 'react';

interface parentTweet  {
    tweetId: string;
    }

const Replies : React.FC <parentTweet>= ({ tweetId }) => {
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    const fetchReplies = async () => {
      const response = await fetch(`/api/tweets/${tweetId}/replies`);
      if (response.ok) {
        const data = await response.json();
        setReplies(data);
      } else {
        console.error('Failed to fetch replies');
      }
    };

    fetchReplies();
  }, [tweetId]);

  return (
    <div>
      {replies.map((reply:any) => (
        <div key={reply.id}>
          <p>{reply.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Replies;