import React, { useEffect, useState } from 'react';
import VideoArray from '../molecules/contentArray';
import SortSelector from '../molecules/sortSelector';
import FlexDiv from '../atoms/flexDiv';
import StyledHeading from '../atoms/heading';
import styled from 'styled-components';
import useFetchContent, { ContentType, ItemsReqeustParams } from '../../hooks/useFetchContent';

interface LeaderboardProps {
  title: string,
  userContentOnly: boolean,
  likedItems: boolean,
  allowSort: boolean,
  contentType: ContentType | null
}

const Leaderboard: React.FC<LeaderboardProps> = ({ title, userContentOnly, likedItems, contentType}) => {
  const { fetchContentAndSetState } = useFetchContent();
  const [requestParams, setRequestParams] = useState<ItemsReqeustParams>({
    sorting: 'top',
    timeframe: userContentOnly || likedItems ? 'all-time' : 'week',
    userContentOnly: userContentOnly,
    likedItems: likedItems,
    contentType: contentType
  });

  useEffect(() => {
    fetchContentAndSetState(requestParams.sorting, requestParams.timeframe, 1, userContentOnly, likedItems, contentType)
  }, [fetchContentAndSetState, requestParams.sorting, requestParams.timeframe, userContentOnly, likedItems, contentType])

  return (
    <FlexDiv flexDirection='column' justifyContent='center'>
      <HeaderContainer>
        <HeadingContainer>
          <StyledHeading level='h1' marginBottom='0' text={title} />
        </HeadingContainer>
        {!likedItems &&
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
