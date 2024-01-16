import React from 'react';
import Leaderboard from '../organisms/leaderboard';

const UserContent: React.FC = () => {
    return <Leaderboard userContentOnly={true} likedItems={false} allowSort={true} title='Your Generated Content' />
}

export default UserContent;
