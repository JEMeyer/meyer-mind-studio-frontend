import React, { useEffect, useState } from 'react';
import ContentArray from '../molecules/content/contentArray';
import SortSelector from '../molecules/sortSelector';
import FlexDiv from '../atoms/flexDiv';
import StyledHeading from '../atoms/heading';
import styled from 'styled-components';
import useFetchContent, { ItemsReqeustParams } from '../../hooks/useFetchContent';
import ContentModal from '../molecules/modal';
import { ContentModalContent } from '../molecules/content/contentModalContent';

interface LeaderboardProps {
  title: string,
  userContentOnly: boolean,
  likedItems: boolean,
  allowSort: boolean
}

const Leaderboard: React.FC<LeaderboardProps> = ({ title, userContentOnly, likedItems}) => {
  const { fetchContentAndSetState } = useFetchContent();
  const [requestParams, setRequestParams] = useState<ItemsReqeustParams>({
    sorting: 'top',
    timeframe: userContentOnly || likedItems ? 'all-time' : 'week',
    userContentOnly: userContentOnly,
    likedItems: likedItems,
    contentType: null
  });

  useEffect(() => {
    fetchContentAndSetState(requestParams.sorting, requestParams.timeframe, 1, userContentOnly, likedItems, requestParams.contentType)
  }, [fetchContentAndSetState, requestParams.sorting, requestParams.timeframe, userContentOnly, likedItems, requestParams.contentType])

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
      <ContentArray requestParams={requestParams} />
      <ContentModal><ContentModalContent /></ContentModal>
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
