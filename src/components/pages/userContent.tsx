import React from 'react';
import Leaderboard from '../organisms/leaderboard';

const UserContent: React.FC = () => {
    return <Leaderboard onlyUserVideos={true} likedVideos={false} allowSort={true} title='Your Generated Videos' />
}

export default UserContent;