import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { videoListState } from '../../state/videoState';
import VideoCard from './videoCard';

const VideoArray: React.FC = () => {
    const videos = useRecoilValue(videoListState);
    return (
        <GridContainer>
            {videos.map((item) => (
                <GridItem key={item.id}>
                    <VideoCard video={item} />
                </GridItem>
            ))}
        </GridContainer>
    );
};

export default VideoArray;

// Styled-components wrapper for the grid container
const GridContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  overflow-x: auto;
`;

// Styled-components wrapper for individual items in the grid
const GridItem = styled.div`
  flex: 0 0 auto;
  padding: 10px;
  box-sizing: border-box;

  // You can customize the responsive breakpoints here
  @media (max-width: 640px) {
    width: 100%;
  }
`;