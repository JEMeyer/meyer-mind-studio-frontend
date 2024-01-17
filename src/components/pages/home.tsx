import React from 'react';
import Leaderboard from '../organisms/leaderboard';
import SharedContent from '../organisms/sharedContent';

const Home: React.FC = () => {


    return (
        <>
            <SharedContent />
            <Leaderboard userContentOnly={false} likedItems={false} allowSort={true} title='Leaderboard' />
        </>);
}

export default Home;
