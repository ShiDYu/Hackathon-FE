import React from 'react';
import { Button } from '@mui/material';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import IconButton from '@mui/material/IconButton';
import './FloatingActionButton.css';

interface FloatingActionButtonProps {
    onClick: () => void;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onClick }) => {
    return (
        <IconButton
            onClick={onClick}
            className="floatingButton"
        >{<ControlPointIcon />}
        </IconButton>
    );
};

export default FloatingActionButton;
