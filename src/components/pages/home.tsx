import React, { useEffect } from 'react';
import StyledHeading from '../atoms/heading';
import { useFetchVideos } from '../../state/videoState';
import VideoArray from '../molecules/videoArray';

const Home: React.FC = () => {
    const { fetchVideos } = useFetchVideos();

    useEffect(() => {
        fetchVideos();
    }, [fetchVideos]);
      
    return (
        <>
            <StyledHeading text='Login to create content.' />
            <StyledHeading level='h3' text='Once you login, use the menu  to navigate to "Storyboard" or "Image".' />
            <VideoArray />
        </>);
}

export default Home;