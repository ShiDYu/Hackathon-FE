import React, { useState, useRef } from "react";
import { fireAuth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { IconButton, Button, TextField, Container, Typography, Box, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { Sidebar } from "../sidebar/Sidebar";

export const CreateTweet: React.FC = () => {
    const [mood, setMood] = useState(""); // 気分を入力するための状態
    const [tweetContent, setTweetContent] = useState(""); // ツイート内容を保存する状態
    const [errorMessage, setErrorMessage] = useState<string | null>(""); 
    const [isLoading, setIsLoading] = useState(false); // ローディング状態を管理するための状態
    const [openPopular, setOpenPopular] = useState(false); // いいね数が稼げそうなツイートのポップアップ
    const [openFunny, setOpenFunny] = useState(false); // 面白いツイートのポップアップ
    const navigate = useNavigate();
    const MAX_CHARS = 140;

    const handleCreateTweet = async () => {
        const user = fireAuth.currentUser;
        if (user) {
            if (tweetContent.trim() === "") {
                setErrorMessage("ツイート内容が空です。");
                return;
            }
            if (tweetContent.length > MAX_CHARS) {
                setErrorMessage(`ツイート内容が${MAX_CHARS}文字を超えています。`);
                return;
            }
            const tweetInfo = {
                uid: user.uid,
                content: tweetContent,
            };

            try {
                setIsLoading(true); // ローディング開始
                const response = await fetch('http://localhost:8000/create-tweet', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(tweetInfo)
                });
                setTimeout(async () => {
                    if (response.ok) {
                        setErrorMessage("");
                        navigate('/tweets'); // ツイート作成が成功したらツイート一覧に遷移
                    } else {
                        console.error('uid:', user.uid);
                        console.error('ツイートの作成に失敗しました。');
                        setErrorMessage('ツイートの作成に失敗しました。');
                    }
                    setIsLoading(false); // ローディング終了
                }, 300);
            } catch (error) {
                console.error('Error creating tweet:', error);
                setErrorMessage('ツイートの作成中にエラーが発生しました。');
                setIsLoading(false); // ローディング終了
            }
        }
    };

    const handleGenerateTweet = async (prompt: string) => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:8000/generate-tweet', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ prompt })
            });

            if (response.ok) {
                const data = await response.json();
                setTweetContent(data.content); // 結果をツイート入力欄に表示
            } else {
                console.error('ツイートの生成に失敗しました。');
                setErrorMessage('ツイートの生成に失敗しました。');
            }
        } catch (error) {
            console.error('Error generating tweet:', error);
            setErrorMessage('ツイートの生成中にエラーが発生しました。');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGeneratePopularTweet = () => {
        const prompt = `${mood} これに関連して自由に発想していいね数が稼げそうなツイートを考えて。回答は140字以内のツイートのみにして。`;
        handleGenerateTweet(prompt);
        setOpenPopular(false); // ダイアログを閉じる
    };

    const handleGenerateFunnyTweet = () => {
        const prompt = `${mood} これに関連して自由に発想して面白く、笑えるツイートを考えて。回答は140字以内のツイートのみにして。`;
        handleGenerateTweet(prompt);
        setOpenFunny(false); // ダイアログを閉じる
    };

    return (
        <Box display="flex">
            <Sidebar />
            <Container maxWidth="sm" sx={{ mt: 2 }}>
                {isLoading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                            <IconButton onClick={() => navigate('/tweets')}>
                                <CloseIcon />
                            </IconButton>
                            {errorMessage && <Typography color="error" sx={{ mb: 2 }}>{errorMessage}</Typography>}
                        </Box>
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            variant="outlined"
                            placeholder="What is happening?!"
                            value={tweetContent}
                            onChange={(e) => setTweetContent(e.target.value)} // ツイート内容の変更をハンドリング
                            inputProps={{ maxLength: MAX_CHARS }}
                            sx={{
                                backgroundColor: 'white',
                                '& .MuiOutlinedInput-root': {
                                    backgroundColor: 'white', // 背景色を白に設定
                                },
                            }}
                        />
                        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                            {tweetContent.length}/{MAX_CHARS}
                        </Typography>
                        <Box display="flex" flexDirection="column" alignItems="flex-start" mt={2}>
                            <Button variant="contained" color="primary" onClick={handleCreateTweet} sx={{ mb: 2 }}>
                                投稿
                            </Button>
                            <Button variant="contained" color="secondary" onClick={() => setOpenPopular(true)} sx={{ mb: 2 }}>
                                いいね数重視のツイートを生成する
                            </Button>
                            <Button variant="contained" color="secondary" onClick={() => setOpenFunny(true)}>
                                面白いツイートを生成する
                            </Button>
                        </Box>
                        <Dialog open={openPopular} onClose={() => setOpenPopular(false)}>
                            <DialogTitle>気分や出来事を入力してください</DialogTitle>
                            <DialogContent>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    type="text"
                                    fullWidth
                                    value={mood}
                                    onChange={(e) => setMood(e.target.value)}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setOpenPopular(false)}>キャンセル</Button>
                                <Button onClick={handleGeneratePopularTweet}>生成</Button>
                            </DialogActions>
                        </Dialog>
                        <Dialog open={openFunny} onClose={() => setOpenFunny(false)}>
                            <DialogTitle>気分や出来事を入力してください</DialogTitle>
                            <DialogContent>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    type="text"
                                    fullWidth
                                    value={mood}
                                    onChange={(e) => setMood(e.target.value)}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setOpenFunny(false)}>キャンセル</Button>
                                <Button onClick={handleGenerateFunnyTweet}>生成</Button>
                            </DialogActions>
                        </Dialog>
                    </>
                )}
            </Container>
        </Box>
    );
};

export default CreateTweet;



//apiからのレスポンスを入力欄に反映できていない











