import React from 'react';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import IconButton from '@mui/material/IconButton';

interface FloatingActionButtonProps {
    onClick: () => void;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onClick }) => {
    return (
        <IconButton
            onClick={onClick}
            className="floatingButton"
            sx={{
                position: "fixed",
                bottom: "60px",
                right: "100px",
                zIndex: 100,
                backgroundColor: "#1da1f2",
                color: "#fff",
                justifyContent: "center",
                alignItems: "center",
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
                '&:hover': { // ここを修正
            backgroundColor: "#1a91da",
        },
            }}
        ><ControlPointIcon />
        </IconButton>
    );
};

export default FloatingActionButton;
