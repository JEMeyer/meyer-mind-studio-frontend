import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import styled from "styled-components";
import FlexDiv from "./flexDiv";

interface DropdownItem {
  value: string;
  label: string;
}

interface DropdownProps {
  items: DropdownItem[];
  selectedItem: string;
  onSelect: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ items, selectedItem, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [shouldCloseOnMouseLeave, setShouldCloseOnMouseLeave] = useState(false);


  const handleSelect = (value: string) => {
    onSelect(value);
    setIsOpen(false);
  };

  const toggle = () => {
    setIsOpen(!isOpen);
    setShouldCloseOnMouseLeave(!isOpen);
  };

  const handleMouseLeave = () => {
    if (shouldCloseOnMouseLeave) {
      setIsOpen(false);
    }
  };

  const selectedItemLabel = items.find((item) => item.value === selectedItem)?.label;

  return (
    <DropdownWrapper onMouseLeave={handleMouseLeave}>
      <DropdownContainer>
        <DropdownButton onClick={toggle} >
          {selectedItemLabel}
          <FlexDiv width='5px' />
          <StyledIcon
            icon={faChevronDown}
            style={{
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          /></DropdownButton>
        {isOpen && (
          <DropdownContent>
            {items.map((item) => (
              <button key={item.value} onClick={() => handleSelect(item.value)}>
                {item.label}
              </button>
            ))}
          </DropdownContent>
        )}
      </DropdownContainer>
    </DropdownWrapper>
  );
};

export default Dropdown;

const DropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  background-color: white;
  border
  color: black;
  padding: 5px 10px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
  border: 1px solid #ccc;
  border-radius: 5px;
  display: flex;
  flex-wrap: nowrap;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const DropdownContent = styled.div`
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 80px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  & button {
    color: black;
    background-color: transparent;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    text-align: left;
    border: none;
    cursor: pointer;
    width: 100%;
  }
  & button:hover {
    background-color: #f1f1f1;
  }
`;


const DropdownContainer = styled.div`
  &:hover ${DropdownContent} {
    display: block;
  }
`;

const StyledIcon = styled(FontAwesomeIcon)`
  transition: transform 0.3s ease;
`;