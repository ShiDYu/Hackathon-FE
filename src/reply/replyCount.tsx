import React, { useEffect, useState } from 'react';

interface ReplyCountProps {
    tweetId: number;
    onReplyCount?: (count: number) => void; // 新しく追加
}

export const ReplyCount: React.FC<ReplyCountProps> = ({ tweetId, onReplyCount }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const fetchReplyCount = async () => {
            const response = await fetch(`http://localhost:8000/reply/count?tweet_id=${tweetId}`);
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

