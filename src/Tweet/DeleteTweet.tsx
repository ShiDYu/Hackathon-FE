import React from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { SxProps } from '@mui/system'; // MUIのスタイル型をインポート

interface DeleteTweetButtonProps {
    tweetId: number;
    onDelete: (tweetId: number) => void;
    sx?: SxProps; // スタイルプロパティを追加
}

const DeleteTweetButton: React.FC<DeleteTweetButtonProps> = ({ tweetId, onDelete, sx }) => {
    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8000/tweets/delete?tweetId=${tweetId}`, {
                method: 'POST',
            });
            if (response.ok) {
                onDelete(tweetId);
                window.location.reload();
            } else {
                console.error("Failed to delete the tweet");
            }
        } catch (error) {
            console.error("Failed to delete the tweet:", error);
        }
    };

    return (
        <IconButton aria-label="delete" onClick={handleDelete} sx={sx}>
            <DeleteIcon />
        </IconButton>
    );
};

export default DeleteTweetButton;

//ツイートの削除はボタンを押してもすぐに消えないので消えるようにしたい押したあとリロードできばよい。



