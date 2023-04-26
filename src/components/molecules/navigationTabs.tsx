import React from 'react';
import styled from "styled-components";
import { TabList } from "../header";

interface NavigationTabsProps {
    isAuthed: boolean,
    handleTabClick: (tabId: number) => void,
    activeTab: number,
}
const NavigationTabs: React.FC<NavigationTabsProps> = ({ isAuthed, handleTabClick, activeTab }) => {
    return (
        <TabContainer>
            {TabList.map((tab) => (
                <Tab
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id)}
                    isActive={tab.id === activeTab}
                    isDisabled={tab.id !== 1 && tab.id !== 5 && !isAuthed}
                >
                    {tab.name}
                </Tab>
            ))}
        </TabContainer>
    );
};

export default NavigationTabs;

const TabContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0;
  margin: 0;
  list-style-type: none;

  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    background-color: #1a3b5c;
    width: 100%;
    z-index: 10;
  }
`;

const Tab = styled.button<{ isActive?: boolean; isHidden?: boolean; isDisabled?: boolean }>`
  background-color: ${({ isActive, isDisabled }) => (isDisabled ? '#3a3a3a' : isActive ? '#0a79df' : 'transparent')};
  display: ${({ isHidden }) => (isHidden ? 'none' : 'block')};
  color: ${({ isActive, isDisabled }) => (isDisabled ? '#aaa' : isActive ? '#fff' : '#ccc')};
  border: none;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 500;
  cursor: ${({ isDisabled }) => (isDisabled ? 'not-allowed' : 'pointer')};
  outline: none;
  border-bottom: 3px solid ${({ isActive, isDisabled }) => (isDisabled ? 'transparent' : isActive ? '#ff6f00' : 'transparent')};
  transition: background-color 0.2s, color 0.2s, border-color 0.2s;

  &:hover {
    background-color: ${({ isActive, isDisabled }) => (isDisabled ? '#3a3a3a' : isActive ? '#084c9f' : 'rgba(255, 255, 255, 0.1)')};
    color: ${({ isDisabled }) => (isDisabled ? '#aaa' : '#fff')};
  }
`;