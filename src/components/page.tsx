import React from 'react';
import ContentCreation from './pages/contentCreation';
import styled from 'styled-components';
import FlexDiv from './atoms/flexDiv';
import { useTabState } from '../hooks/useAppState';
import Home from './pages/home';
import UserContent from './pages/userContent';
import About from './pages/about';

const Page: React.FC = () => {
    const {tab} = useTabState();
    let component = <></>;

    switch (tab) {
        case 1:
            component = <Home />;
            break;
        case 2:
            component = <ContentCreation />;
            break;
        case 3:
            component = <UserContent />;
            break;
        case 4:
            component = <About />;
            break;
        default:
            component = <></>;
    }

    return (<Main>{component}</Main>);
}

export default Page;

const Main = styled(FlexDiv)`
    margin-top: 15px;
    flex-direction: column;
`;