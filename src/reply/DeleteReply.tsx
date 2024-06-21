import React from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { SxProps } from '@mui/system'; // MUIのスタイル型をインポート

interface DeleteReplyButtonProps {
    replyId: number;
    onDelete: (replyId: number) => void;
    sx?: SxProps; // スタイルプロパティを追加
}

const DeleteReplyButton: React.FC<DeleteReplyButtonProps> = ({ replyId, onDelete, sx }) => {

    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

    const handleDelete = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/replies/delete?replyId=${replyId}`, {
                method: 'POST',
            });
            if (response.ok) {
                onDelete(replyId);
                window.location.reload(); // ページをリロードする
            } else {
                console.error("Failed to delete the reply");
            }
        } catch (error) {
            console.error("Failed to delete the reply:", error);
        }
    };

    return (
        <IconButton aria-label="delete" onClick={handleDelete} sx={sx}>
            <DeleteIcon />
        </IconButton>
    );
};

export default DeleteReplyButton;


//リプライの削除ボタンを押すとリプライが削除すぐに消えるがview repliesが消えないのでこれもリロードできれば解決するはず
