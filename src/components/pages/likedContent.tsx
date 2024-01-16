import React from 'react';
import Leaderboard from '../organisms/leaderboard';

const LikedContent: React.FC = () => {
    return <Leaderboard likedItems={true} userContentOnly={false} allowSort={false} contentType={null} title='Your Liked Content' />
}

export default LikedContent;
