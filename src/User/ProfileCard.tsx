import React, { useState, useEffect } from 'react';
import { Card, CardContent, Avatar, Typography, Box, CircularProgress } from '@mui/material';
import { fireAuth } from "../firebase";
import './ProfileCard.css'; // CSSをインポート

interface UserProfile {
    id: string;
    name: string;
    bio: string;
    avatarUrl: string;
}

export const ProfileCard: React.FC = () => {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = fireAuth.onAuthStateChanged(user => {
            if (user) {
                setUserId(user.uid);
            } else {
                console.error('ユーザーがログインしていません。');
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const fetchProfile = async () => {
            console.log(userId);
            if (userId) {
                try {
                    const response = await fetch(`http://localhost:8000/profilecard?userId=${userId}`);
                    if (response.ok) {
                        const data = await response.json();
                        setProfile({
                            id: data.id,
                            name: data.nickname,
                            bio: data.bio,
                            avatarUrl: data.avatar,
                        });
                    } else {
                        console.error('プロフィールの取得に失敗しました。');
                    }
                } catch (error) {
                    console.error('Error fetching profile:', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchProfile();
    }, [userId]);

    if (loading) {
        return (
            <div className="circular">
                <CircularProgress />
            </div>
        );
    }

    return (
        profile && (
            <Card className="profile-card">
                <CardContent>
                    <Box display="flex" alignItems="center">
                        <Avatar alt={profile.name} src={profile.avatarUrl} className="avatar-icon" sx={{ width: 110, height: 110, backgroundColor: '#1DA1F2' }} />
                        <Box marginLeft={2}>
                            <Typography variant="subtitle1" color="textSecondary">Username</Typography>
                            <Typography variant="h5" component="div">
                                {profile.name}
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary" style={{ marginTop: '10px' }}>Bio</Typography>
                            <Typography variant="body2">
                                {profile.bio}
                            </Typography>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        )
    );
};

export default ProfileCard;




