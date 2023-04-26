import React from 'react';
import Leaderboard from '../organisms/leaderboard';

const LikedContent: React.FC = () => {
    return <Leaderboard likedVideos={true} onlyUserVideos={false} allowSort={false} title='Your Liked Videos' />
}

export default LikedContent;