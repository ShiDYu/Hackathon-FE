import React, { useState } from 'react';
import { fireAuth } from '../firebase';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';

interface ParentReplyProps {
  replyId: number;
  open: boolean;
  onClose: () => void;
}

export const ReplyForm: React.FC<ParentReplyProps> = ({ replyId, open, onClose }) => {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const user = fireAuth.currentUser;
  const MAX_CHARS = 140;
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('replyId:', replyId);
    if (content.length === 0) {
      setError('入力してください');
      return;
    }

    if (content.length > MAX_CHARS) {
      setError(`140文字以内で入力してください`);
      return;
    }

    const response = await fetch(`${apiBaseUrl}/replytoreply`, { //apiのURLを変更
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        replyId: Number(replyId),//jsonのキーに気をつける
        uid: user?.uid,
        content: content,
      }),
    });

    if (response.ok) {
      setContent('');
      onClose();
      setError('');
      window.location.reload(); 
    } else {
      setError('Failed to submit reply');
      console.error('Failed to submit reply');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
    if (e.target.value.length <= MAX_CHARS && e.target.value.length > 0) {
      setError('');
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        handleSubmit(new Event('submit') as unknown as React.FormEvent); // フォームを送信
    }
};

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
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
            onKeyPress={handleKeyPress} 
            inputProps={{ maxLength: MAX_CHARS }}
            error={Boolean(error)}
            helperText={error || `${content.length}/${MAX_CHARS}`}
          />
          <DialogActions>
            <Button onClick={onClose} color="primary">
              やめる
            </Button>
            <Button type="submit" variant="contained" color="primary">
              リプライ
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReplyForm;





