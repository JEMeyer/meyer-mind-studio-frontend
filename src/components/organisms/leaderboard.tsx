import React, { useEffect, useState } from 'react';
import VideoArray from '../molecules/videoArray';
import SortSelector from '../molecules/sortSelector';
import FlexDiv from '../atoms/flexDiv';
import StyledHeading from '../atoms/heading';
import styled from 'styled-components';
import useFetchVideos from '../../hooks/useFetchVideos';

export interface VideosRequestParams {
  sorting: string,
  timeframe: string,
  onlyUserVideos: boolean,
  likedVideos: boolean,
}

interface LeaderboardProps {
  title: string,
  onlyUserVideos: boolean,
  likedVideos: boolean,
  allowSort: boolean,
}

const Leaderboard: React.FC<LeaderboardProps> = ({ title, onlyUserVideos, likedVideos}) => {
  const { fetchVideosAndSetState } = useFetchVideos();
  const [requestParams, setRequestParams] = useState<VideosRequestParams>({
    sorting: 'top',
    timeframe: onlyUserVideos || likedVideos ? 'all-time' : 'week',
    onlyUserVideos: onlyUserVideos,
    likedVideos: likedVideos
  });

  useEffect(() => {
      fetchVideosAndSetState(requestParams.sorting, requestParams.timeframe, 1, onlyUserVideos, likedVideos)
  }, [fetchVideosAndSetState, requestParams.sorting, requestParams.timeframe, onlyUserVideos, likedVideos])

  return (
    <FlexDiv flexDirection='column' justifyContent='center'>
      <HeaderContainer>
        <HeadingContainer>
          <StyledHeading level='h1' marginBottom='0' text={title} />
        </HeadingContainer>
        {!likedVideos && 
        <SortSelectorContainer>
          <SortSelector requestParams={requestParams} setRequestParams={setRequestParams} />
        </SortSelectorContainer>
        }
      </HeaderContainer>
      <VideoArray requestParams={requestParams} />
    </FlexDiv>
  );
}

export default Leaderboard;

const HeaderContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  width: 100%;

  @media (max-width: 1170px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    text-align: center;

    & > *:not(:last-child) {
      margin-bottom: 16px;
    }
  }
`;

const HeadingContainer = styled.div`
    grid-column: 2;
    grid-row: 1;
    display: flex;
    justify-content: center;

    @media (max-width: 1170px) {
        grid-column: 1 / -1;
      }
`;

const SortSelectorContainer = styled.div`
  grid-column: 1;
  grid-row: 1;
  justify-self: start;

  @media (max-width: 1170px) {
    grid-column: 1 / -1;
    grid-row: 2;
  }
`;