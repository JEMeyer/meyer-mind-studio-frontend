import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import VideoCard from './videoCard';
import useFetchVideos from '../../hooks/useFetchVideos';
import { useRecoilState } from 'recoil';
import { videosRequestState } from '../../hooks/useAppState';
import FlexDiv from '../atoms/flexDiv';

const VideoArray: React.FC = () => {
  const { videos, setVideos, fetchVideos } = useFetchVideos();
  const [videosRequestParams] = useRecoilState(videosRequestState);
  const [page, setPage] = useState(1)

  const appendVideosToState = async ()  => {
    const newPage = page + 1;
    let newVideos = await fetchVideos(videosRequestParams.sorting, videosRequestParams.timeframe, newPage) || [];
    newVideos = newVideos.filter((newVideo) => !videos.some((video) => video.id === newVideo.id));
    setVideos([...videos,  ...newVideos]);
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
          <LoadMoreButton onClick={appendVideosToState}>Load More</LoadMoreButton>
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

const LoadMoreButton = styled.button`
  background-color: #4caf50;
  color: white;
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-bottom: 20px;

  &:hover {
    background-color: #3e8e41;
  }
`;