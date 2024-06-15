// ReplyForm.js
import React, { useState } from 'react';
import { fireAuth } from './firebase';
import ReplyIcon from '@mui/icons-material/Reply';
import { IconButton, TextField, Button, Box } from '@mui/material';

interface ParentTweetProps {
  tweetId: string;
}

export const ReplyComponent: React.FC<ParentTweetProps> = ({ tweetId }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [content, setContent] = useState('');
  const user = fireAuth.currentUser;

  const handleReplyClick = () => {
    setShowReplyForm(!showReplyForm);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('http://localhost:8000/reply', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uid: user?.uid,
        content,
        parent_tweet_id: tweetId,
      }),
    });

    if (response.ok) {
      setContent('');
      setShowReplyForm(false);
    } else {
      console.error('Failed to submit reply');
    }
  };

  return (
    <Box>
      <IconButton onClick={handleReplyClick}>
        <ReplyIcon />
      </IconButton>
      {showReplyForm && (
        <Box component="form" onSubmit={handleSubmit} mt={2}>
          <TextField
            label="Write a reply..."
            variant="outlined"
            fullWidth
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 1 }}
          >
            Submit
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ReplyComponent;

