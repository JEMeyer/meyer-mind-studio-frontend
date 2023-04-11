import React from 'react';
import { useRecoilValue } from 'recoil';
import { tabState } from '../state/appState';
import Home from './pages/home';
import ImageGeneration from './pages/imageGeneration';
import StoryboardGeneration from './pages/storyboardGeneration';
import styled from 'styled-components';
import FlexDiv from './atoms/flexDiv';

const Page: React.FC = () => {
    const activePage = useRecoilValue(tabState);

    switch (activePage) {
        case 1:
            return <Main><Home /></Main>
        case 2:
            return <Main><StoryboardGeneration /></Main>
        case 3:
            return <Main><ImageGeneration /></Main>
        default:
            return <Main><Home /></Main>
    }
}

export default Page;

const Main = styled(FlexDiv)`
    margin-top: 15px;
    flex-direction: column;
`;