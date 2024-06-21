import React, { useEffect, useState } from 'react';

interface ReplyCountProps {
    tweetId: number;
    onReplyCount?: (count: number) => void; // 新しく追加
}

export const ReplyCount: React.FC<ReplyCountProps> = ({ tweetId, onReplyCount }) => {
    const [count, setCount] = useState(0);

    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

    useEffect(() => {
        const fetchReplyCount = async () => {
            const response = await fetch(`${apiBaseUrl}/reply/count?tweet_id=${tweetId}`);
            if (response.ok) {
                const data = await response.json();
                setCount(data.count);
                if (onReplyCount) {
                    onReplyCount(data.count); // リプライ数を親コンポーネントに渡す
                }
            } else {
                console.error('Failed to fetch reply count');
            }
        };

        fetchReplyCount();
    }, [tweetId]);

    return (
        <span>{count}</span>
    );
};

