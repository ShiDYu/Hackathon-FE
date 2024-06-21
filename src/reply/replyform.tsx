import React, { useState } from 'react';
import { fireAuth } from '../firebase';
import ReplyIcon from '@mui/icons-material/Reply';
import { IconButton, TextField, Button, Dialog, DialogActions, DialogContent } from '@mui/material';

interface ParentTweetProps {
  tweetId: string;
  initialContent: string;
}

export const ReplyComponent: React.FC<ParentTweetProps> = ({ tweetId, initialContent }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [tweetContent] = useState(initialContent); // 初期のツイート内容を設定
  const user = fireAuth.currentUser;
  const MAX_CHARS = 140;

  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

  const handleReplyClick = () => {
    setShowReplyForm(true);
  };

  const handleClose = () => {
    setShowReplyForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (content.length === 0) {
      setError('入力してください');
      return;
    }

    if (content.length > MAX_CHARS) {
      setError(`140文字以内で入力してください`);
      return;
    }

    const response = await fetch(`${apiBaseUrl}/reply`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tweet_id: tweetId,
        uid: user?.uid,
        content: content,
      }),
    });

    if (response.ok) {
      setContent('');
      setShowReplyForm(false);
      setError('');
      window.location.reload();
    } else {
      setError('Failed to submit reply');
      console.error('Failed to submit reply');
    }
  };

  const handleAIReply = async () => {
    if (!tweetContent) {
      setError('Failed to load tweet content');
      console.error('tweetContent is not loaded');
      return;
    }

    console.log('tweetContent:', tweetContent);
    const response = await fetch(`${apiBaseUrl}/ai-reply?tweetId=${tweetId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: `"${tweetContent}" これに対する面白いリプライを考えてください。語尾は、っぴ、にしてください。返すのはリプライのみにしてください。`,
      }),
    });

    if (response.ok) {
      window.location.reload();
    } else {
      setError('Failed to get AI reply');
      console.error('Failed to get AI reply');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
    if (e.target.value.length <= MAX_CHARS && e.target.value.length > 0) {
      setError('');
    }
  };

  return (
    <div>
      <IconButton onClick={handleReplyClick}>
        <ReplyIcon />
      </IconButton>
      <Dialog
        open={showReplyForm}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Reply"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={content}
              onChange={handleChange}
              inputProps={{ maxLength: MAX_CHARS }}
              error={Boolean(error)}
              helperText={error || `${content.length}/${MAX_CHARS}`}
            />
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
              <Button onClick={handleAIReply} variant="contained" color="secondary">
                みどぴっぴにリプライを書いてもらう
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReplyComponent;



//リプライを投稿した時にリロードされるようにする



