// LogoutButton.tsx
import React from 'react';
import { fireAuth } from '../firebase';
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

export const LogoutButton: React.FC = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
      signOut(fireAuth)
        .then(() => {
          console.log('Signed out successfully');
          navigate(`/`);
        })
        .catch((error) => {
          console.error('Error signing out: ', error);
        });
    };


  return (
    <button onClick={handleLogout}>
        ログアウト
    </button>
  );
};

export default LogoutButton;
