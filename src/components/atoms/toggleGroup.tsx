import React from "react";
import styled, { css } from "styled-components";
import StyledButton from "./button";

interface ToggleItem {
  value: string;
  label: string;
}

interface ToggleGroupProps {
  items: ToggleItem[];
  selectedItem: string;
  onSelect: (value: string) => void;
}

const ToggleGroup: React.FC<ToggleGroupProps> = ({
  items,
  selectedItem,
  onSelect,
}) => {
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
  background-color: #f0f0f0; /* Slightly grey background */
  border-radius: 4px; /* Rounded corners for the container */
`;

const ToggleButton = styled(StyledButton)<{ isActive: boolean }>`
  color: white;
  background-color: ${(props) => (props.isActive ? "#004499" : "gray")};
  padding: 8px 16px;
  margin: 0;
  font-size: 13.3333px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${(props) => (props.isActive ? "#003377" : "#888")};
  }

  ${(props) =>
    props.isActive &&
    css`
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2); /* Inner shadow for active button */
    `}

  &:first-child {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }

  &:last-child {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  &:not(:last-child) {
    border-right: 1px solid white; /* Divider between buttons */
  }
`;
