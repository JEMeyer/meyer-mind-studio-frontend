import React, {  useState } from 'react';
import styled from 'styled-components';
import VideoCard from './videoCard';
import useFetchVideos, { ItemsReqeustParams } from '../../../hooks/useFetchVideos';
import FlexDiv from '../../atoms/flexDiv';
import CustomButton from '../../atoms/button';

interface VideoArrayProps {
  requestParams: ItemsReqeustParams,
}

const VideoArray: React.FC<VideoArrayProps> = ({requestParams}) => {
  const { videos, setVideos, fetchVideos } = useFetchVideos();
  const [page, setPage] = useState(1);
  let [nextDisabled, setNextDisabled] = useState(false);

  const appendVideosToState = async () => {
    const newPage = page + 1;
    let newVideos = await fetchVideos(requestParams.sorting, requestParams.timeframe, newPage, requestParams.userContentOnly, requestParams.likedItems) || [];
    newVideos = newVideos.filter((newVideo) => !videos.some((video) => video.id === newVideo.id));
    if (newVideos.length === 0) {
      setNextDisabled(true);
    }
    setVideos([...videos, ...newVideos]);
    setPage(newPage);
  };

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
