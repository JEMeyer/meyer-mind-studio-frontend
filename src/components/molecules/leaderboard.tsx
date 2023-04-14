import React from 'react';
import VideoArray from './videoArray';
import SortSelector from './sortSelector';
import FlexDiv from '../atoms/flexDiv';
import StyledHeading from '../atoms/heading';
import styled from 'styled-components';

const Leaderboard: React.FC = () => {
    return (
        <FlexDiv flexDirection='column' justifyContent='center'>
            <HeaderContainer>
                <HeadingContainer>
                    <StyledHeading level='h1' marginBottom='0' text='Leaderboard' />
                </HeadingContainer>
                <SortSelectorContainer>
                    <SortSelector />
                </SortSelectorContainer>
            </HeaderContainer>
            <VideoArray />
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