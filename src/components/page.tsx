import React from 'react';
import ContentCreation from './pages/contentCreation';
import styled from 'styled-components';
import FlexDiv from './atoms/flexDiv';
import { useTabState } from '../hooks/useAppState';
import Home from './pages/home';

const Page: React.FC = () => {
    const {tab} = useTabState();

    switch (tab) {
        case 1:
            return <Main><Home /></Main>
        case 2:
            return <Main><ContentCreation /></Main>
        default:
            return <Main><></></Main>
    }
}

export default Page;

const Main = styled(FlexDiv)`
    margin-top: 15px;
    flex-direction: column;
`;