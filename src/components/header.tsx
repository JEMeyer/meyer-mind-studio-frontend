import React, { useState } from 'react';
import styled from 'styled-components';
import UserMenu from './molecules/userMenu';
import Burger from './molecules/burger';
import Menu from './molecules/menu';
import NavigationTabs from './molecules/navigationTabs';
import { useMediaQuery } from 'react-responsive';
import { useGetCredentials } from '../hooks/useCredentials';
import { useTabState } from '../hooks/useAppState';

export const TabList = [
    { id: 1, name: 'Home' },
    { id: 2, name: 'Storyboard' },
    { id: 3, name: 'Image' },
];

const Header: React.FC = () => {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const {tab, setTab} = useTabState();
    const credentials = useGetCredentials();
    const [open, setOpen] = useState(false);

    const handleButtonClick = (tabId: number) => {
        setTab(tabId);
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
            <AppName>Meyer Mind Studio</AppName>
            {isMobile && <Menu open={open} setOpen={setOpen} activeTab={tab} isAuthed={!!credentials} onLinkClick={handleLinkClick}/>}
            {!isMobile && <NavigationTabs activeTab={tab} handleTabClick={handleButtonClick} isAuthed={!!credentials} />}
            <UserMenu />
        </HeaderWrapper>
    );
};

export default Header;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background-color: #1a3b5c;
  margin: -8px;
`;

const AppName = styled.h1`
    color: white;
    font-size: 24px;
    @media screen and (max-width: 768px) {
        display: none;
    }
`;
