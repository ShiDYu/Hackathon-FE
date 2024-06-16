import React, { useState, useEffect } from 'react';
import { fireAuth } from '../firebase';
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

export const Logoutpage: React.FC = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setOpen(true); // コンポーネントがマウントされたときにダイアログを開く
    }, []);

    const handleClose = () => {
        setOpen(false);
        navigate('/tweets'); // ダイアログを閉じたときにホームページに遷移
    };

    const handleLogout = () => {
        signOut(fireAuth)
            .then(() => {
                console.log('Signed out successfully');
                navigate(`/`);
            })
            .catch((error) => {
                console.error('Error signing out: ', error);
            });
        setOpen(false);
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"ログアウトしますか？"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        本当にログアウトしますか？
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        いいえ
                    </Button>
                    <Button onClick={handleLogout} color="primary" autoFocus>
                        はい
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Logoutpage;

