import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { tabState } from '../state/appState';
import UserMenu from './molecules/userMenu';

export const TabList = [
    { id: 1, name: 'Home' },
    { id: 2, name: 'Storyboard Creation' },
    { id: 3, name: 'Image Generation' },
];

const Header: React.FC = () => {
    const [activeTab, setActiveTab] = useRecoilState(tabState);

    const handleTabClick = (tabId: number) => {
        setActiveTab(tabId);
    };

    return (
        <HeaderWrapper>
            <AppName>Meyer Mind Studio</AppName>
            <TabContainer>
                {TabList.map((tab) => (
                    <Tab
                        key={tab.id}
                        onClick={() => handleTabClick(tab.id)}
                        isActive={tab.id === activeTab}
                    >
                        {tab.name}
                    </Tab>
                ))}
            </TabContainer>
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
`;

const TabContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0;
  margin: 0;
  list-style-type: none;
`;

const Tab = styled.button<{ isActive?: boolean }>`
background-color: ${({ isActive }) => (isActive ? '#ff9900' : 'transparent')};
color: ${({ isActive }) => (isActive ? '#fff' : '#ccc')};
  border: none;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  outline: none;
  transition: background-color 0.2s, color 0.2s;

  &:hover {
    background-color: ${({ isActive }) => (isActive ? '#e67e00' : 'rgba(255, 255, 255, 0.1)')};
`;

const AppName = styled.h1`
color: white;
font-size: 24px;
`;