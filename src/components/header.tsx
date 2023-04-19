import React, { useState } from 'react';
import styled from 'styled-components';
import UserMenu from './molecules/userMenu';
import Burger from './molecules/burger';
import Menu from './molecules/menu';
import NavigationTabs from './molecules/navigationTabs';
import { useMediaQuery } from 'react-responsive';
import { useGetCredentials } from '../hooks/useCredentials';
import { useTabState } from '../hooks/useAppState';
import { toast } from 'react-toastify';
import useSharedVideo from '../hooks/useSharedVideo';

export const TabList = [
    { id: 1, name: 'Home' },
    { id: 2, name: 'Create Content' },
    { id: 3, name: 'Your Content' },
    { id: 4, name: 'About' },
];

const Header: React.FC = () => {
    const isMobile = useMediaQuery({ query: '(max-width: 900px)' });
    const {tab, setTab} = useTabState();
    const { setSharedVideo } = useSharedVideo()
    const credentials = useGetCredentials();
    const [open, setOpen] = useState(false);
    const isAuthed = !!credentials;

    const handleButtonClick = (tabId: number) => {
        if (tabId !== 1 && tabId !== 4 && !isAuthed) {
            toast.warn('Please login to use this tab.')
        } else {
            setTab(tabId);
            setSharedVideo(null);
        }
        setOpen(false);
    };

    const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        const prop = (event.target as HTMLElement).getAttribute('data-tab-id');
        const tab = Number(prop)
        handleButtonClick(tab);
    }

    return (
        <HeaderWrapper>
            {isMobile && <Burger open={open} setOpen={setOpen} />}
            <AppName>AI Storyboards</AppName>
            {isMobile && <Menu open={open} setOpen={setOpen} activeTab={tab} isAuthed={isAuthed} onLinkClick={handleLinkClick}/>}
            {!isMobile && <NavigationTabs activeTab={tab} handleTabClick={handleButtonClick} isAuthed={isAuthed} />}
            <UserMenu />
        </HeaderWrapper>
    );
};

export default Header;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  background-color: #1a3b5c;
  margin: 0 -8px;
`;

const AppName = styled.h1`
    color: white;
    font-size: 24px;
    @media screen and (max-width: 900px) {
        display: none;
    }
`;
