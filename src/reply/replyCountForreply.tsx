import React, { useEffect, useState } from 'react';

interface ReplyProps {
    replyId: number;
}

export const ReplyReplyCount: React.FC<ReplyProps> = ({ replyId }) => {
    const [replyReplyCount, setReplyReplyCount] = useState(0);

    useEffect(() => {
        const fetchReplyReplyCount = async () => {
            const response = await fetch(`http://localhost:8000/reply_replies/count?reply_id=${replyId}`);
            if (response.ok) {
                const data = await response.json();
                setReplyReplyCount(data.count);
            } else {
                console.error('Failed to fetch reply reply count');
            }
        };

        fetchReplyReplyCount();
    }, [replyId]);

    return (
        <div>
            <p>{replyReplyCount}</p>
        </div>
    );
};

export default ReplyReplyCount;

