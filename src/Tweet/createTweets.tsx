import React, { useState } from "react";
import { fireAuth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { IconButton, Button, TextField, Container, Typography, Box } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { Sidebar } from "../sidebar/Sidebar";

export const CreateTweet: React.FC = () => {
    const [content, setContent] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | null>(""); 
    const navigate = useNavigate();
    const MAX_CHARS = 140;

    const handleCreateTweet = async () => {
        const user = fireAuth.currentUser;
        if (user) {
            if (content.trim() === "") {
                setErrorMessage("ツイート内容が空です。");
                return;
            }
            if (content.length > MAX_CHARS) {
                setErrorMessage(`ツイート内容が${MAX_CHARS}文字を超えています。`);
                return;
            }
            const tweetInfo = {
                uid: user.uid,
                content: content,
            };

            try {
                const response = await fetch('http://localhost:8000/create-tweet', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(tweetInfo)
                });
                if (response.ok) {
                    setErrorMessage("");
                    navigate('/tweets'); // ツイート作成が成功したらツイート一覧に遷移
                } else {
                    console.error('uid:', user.uid);
                    console.error('ツイートの作成に失敗しました。');
                    setErrorMessage('ツイートの作成に失敗しました。');
                }
            } catch (error) {
                console.error('Error creating tweet:', error);
                setErrorMessage('ツイートの作成中にエラーが発生しました。');
            }
        }
    };

    return (
        <Box display="flex">
            <Sidebar />
            <Container maxWidth="sm" sx={{ mt: 2 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <IconButton onClick={() => navigate('/tweets')}>
                        <CloseIcon />
                    </IconButton>
                    {errorMessage && <Typography color="error" sx={{ mb: 2 }}>{errorMessage}</Typography>}
                    <Button variant="contained" color="primary" onClick={handleCreateTweet}>
                        投稿
                    </Button>
                </Box>
                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    placeholder="What is happening?!"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    inputProps={{ maxLength: MAX_CHARS }}
                />
                <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                    {content.length}/{MAX_CHARS}
                </Typography>
            </Container>
        </Box>
    );
};

export default CreateTweet;

