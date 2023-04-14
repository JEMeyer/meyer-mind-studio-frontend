import React from 'react';
import StyledHeading from '../atoms/heading';
import useSharedVideo from '../../hooks/useSharedVideo';
import VideoCard from '../molecules/videoCard';

const SharedVideo: React.FC = () => {
    const {sharedVideo} = useSharedVideo();
    if (sharedVideo == null) {
        return <></>;
    }

    return (
    <>
        <StyledHeading text='Shared Video' />
        <VideoCard video={sharedVideo} />
    </>);
}

export default SharedVideo;