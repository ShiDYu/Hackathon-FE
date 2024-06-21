import React, { useState } from 'react';
import { IconButton, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

interface EditTweetButtonProps {
  tweetId: number;
  initialContent: string;
  onSave: (tweetId: number, newContent: string) => void;
}

const EditTweetButton: React.FC<EditTweetButtonProps> = ({ tweetId, initialContent, onSave }) => {
  const [open, setOpen] = useState(false);
  const [editContent, setEditContent] = useState(initialContent);
  const [error, setError] = useState('');
  const MAX_CHARS = 140;

  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    if (editContent.length === 0) {
      setError('入力してください');
      return;
    }

    if (editContent.length > MAX_CHARS) {
      setError(`140文字以内で入力してください`);
      return;
    }
    console.log('tweetId:', tweetId);
    console.log('editContent:', editContent);
    console.log(typeof tweetId);

    try {
      const response = await fetch(`${apiBaseUrl}/update-tweet`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id:Number(tweetId), content: editContent }),
      });
      if (response.ok) {
        onSave(tweetId, editContent);
        window.location.reload();
        handleClose();
      } else {
        console.error("Failed to save tweet");
        setError('Failed to save tweet');
      }
    } catch (error) {
      console.error("Failed to save tweet", error);
      setError('Failed to save tweet');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditContent(e.target.value);
    if (e.target.value.length <= MAX_CHARS && e.target.value.length > 0) {
      setError('');
    }
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen} sx={{ ml: 1.5 }}>
        <EditIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogContent>
          <TextField
            label="Edit Tweet"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={editContent}
            onChange={handleChange}
            inputProps={{ maxLength: MAX_CHARS }}
            error={Boolean(error)}
            helperText={error || `${editContent.length}/${MAX_CHARS}`}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditTweetButton;


