import React from 'react';
import Leaderboard from '../organisms/leaderboard';
import SharedVideo from '../organisms/sharedVideo';

const Home: React.FC = () => {


    return (
        <>
            <SharedVideo />
            <Leaderboard onlyUserVideos={false} likedVideos={false} allowSort={true}  title='Leaderboard' />
        </>);
}

export default Home;