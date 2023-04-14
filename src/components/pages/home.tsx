import React from 'react';
import StyledHeading from '../atoms/heading';
import VideoArray from '../molecules/videoArray';
import SortSelector from '../molecules/sortSelector';

const Home: React.FC = () => {


    return (
        <>
            <StyledHeading text='Login to create content.' />
            <StyledHeading level='h3' text='Once you login, use the menu  to navigate to "Storyboard" or "Image".' />
            <SortSelector />
            <VideoArray />
        </>);
}

export default Home;