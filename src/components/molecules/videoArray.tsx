import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import VideoCard from './videoCard';
import useFetchVideos from '../../hooks/useFetchVideos';
import FlexDiv from '../atoms/flexDiv';
import { useVideosRequestState } from '../../hooks/useAppState';
import CustomButton from '../atoms/button';

interface VideoArrayProps {
  onlyUserVideos: boolean
}

const VideoArray: React.FC<VideoArrayProps> = ({onlyUserVideos}) => {
  const { videos, setVideos, fetchVideos } = useFetchVideos();
  const { videosRequestParams } = useVideosRequestState();
  const [page, setPage] = useState(1);
  const [nextDisabled, setNextDisabled] = useState(false);

  const appendVideosToState = async () => {
    const newPage = page + 1;
    let newVideos = await fetchVideos(videosRequestParams.sorting, videosRequestParams.timeframe, newPage, onlyUserVideos) || [];
    newVideos = newVideos.filter((newVideo) => !videos.some((video) => video.id === newVideo.id));
    if (newVideos.length === 0) {
      setNextDisabled(true);
    }
    setVideos([...videos, ...newVideos]);
    setPage(newPage);
  };

  // If someone else changes sorting or timeframe, reset to page 1
  useEffect(() => {
    setPage(1);
  }, [videosRequestParams.sorting, videosRequestParams.timeframe])

  return (
    <>
      <GridContainer>
        {videos.map((item) => (
          <GridItem key={item.id}>
            <VideoCard video={item} />
          </GridItem>
        ))}
        <FlexDiv width='100%' >
          <CustomButton onClick={appendVideosToState} disabled={nextDisabled} margin='5px 5px 30px 5px'>Load More</CustomButton>
        </FlexDiv>
      </GridContainer>
    </>
  );
};

export default VideoArray;

// Styled-components wrapper for the grid container
const GridContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  overflow-x: auto;
  justify-content: center;
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
