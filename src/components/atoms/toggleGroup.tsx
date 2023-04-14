import React from 'react';
import styled from 'styled-components';
import StyledButton from './button';

interface ToggleItem {
  value: string;
  label: string;
}

interface ToggleGroupProps {
  items: ToggleItem[];
  selectedItem: string;
  onSelect: (value: string) => void;
}

const ToggleGroup: React.FC<ToggleGroupProps> = ({ items, selectedItem, onSelect }) => {
  return (
    <ToggleContainer>
      {items.map((item) => (
        <ToggleButton
          key={item.value}
          isActive={selectedItem === item.value}
          onClick={() => onSelect(item.value)}
        >
          {item.label}
        </ToggleButton>
      ))}
    </ToggleContainer>
  );
};

export default ToggleGroup;

const ToggleContainer = styled.div`
  display: flex;
`;

const ToggleButton = styled(StyledButton)<{ isActive: boolean }>`
  border: none;
  color: white;
  background-color: ${(props) => (props.isActive ? '#004499' : 'gray')};
  padding: 8px 16px;
  margin: 0;
  font-size: 13.3333px;
  cursor: pointer;

  &:first-child {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }

  &:last-child {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  &:not(:last-child) {
    border-right: 1px solid white;
  }
`;