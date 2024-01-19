import React, { useState } from "react";
import styled from "styled-components";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FlexDiv from "./flexDiv";
import { Menu, MenuItem } from "@mui/material";

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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const selectedItemLabel = items.find(item => item.value === selectedItem)?.label;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (value: string) => {
    onSelect(value);
    handleClose();
  };

  return (
    <DropdownWrapper>
      <DropdownButton onClick={handleClick}>
        {selectedItemLabel}
        <FlexDiv width="5px" />
          <StyledIcon
            icon={faChevronDown}
            style={{
              transform: Boolean(anchorEl) ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          />
      </DropdownButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {items.map((item) => (
          <MenuItem key={item.value} onClick={() => handleSelect(item.value)}>
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </DropdownWrapper>
  );
};

export default Dropdown;

const DropdownWrapper = styled.div`
  display: inline-block;
`;

const DropdownButton = styled.button`
  background-color: white;
  color: black;
  padding: 5px 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s, box-shadow 0.2s;

  &:hover {
    background-color: #f8f8f8;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  }
`;

const StyledIcon = styled(FontAwesomeIcon)`
  transition: transform 0.3s ease;
`;
