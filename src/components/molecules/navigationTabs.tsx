import React from 'react';
import styled from "styled-components";
import { TabList } from "../header";

interface NavigationTabsProps {
    isAuthed: boolean,
    handleTabClick: (tabId: number) => void,
    activeTab: number
}
export const NavigationTabs: React.FC<NavigationTabsProps> = ({ isAuthed, handleTabClick, activeTab }) => {
    return (<TabContainer isAuthed={isAuthed}>
        {TabList.map((tab) => (
            <Tab
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                isActive={tab.id === activeTab}
                isHidden={tab.id !== 1 && !isAuthed}
            >
                {tab.name}
            </Tab>
        ))}
    </TabContainer>)
}

export default NavigationTabs

interface TabContainerProps {
    isAuthed: boolean
}

const TabContainer = styled.div<TabContainerProps>`
  display: flex;
  align-items: center;
  padding: 0;
  margin: 0;
  list-style-type: none;

  @media screen and (max-width: 768px) {
    display: 'block';
    position: absolute;
    background-color: #1a3b5c;
    width: 100%;
    z-index: 10;
  }
`;

const Tab = styled.button<{ isActive?: boolean, isHidden?: boolean }>`
background-color: ${({ isActive }) => (isActive ? '#ff9900' : 'transparent')};
display: ${({ isHidden }) => (isHidden ? 'none' : 'block')};
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