import React, { useState } from 'react';
import styled from 'styled-components';

interface ToggleProps {
  enabled?: boolean,
  onChange?: (isChecked: boolean) => void;
}

const ToggleContainer = styled.label`
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
`;

const ToggleInput = styled.input.attrs({ type: 'checkbox' })`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: #33cc33;

    &::before {
      transform: translateX(20px);
    }
  }

  &:focus + span {
    box-shadow: 0 0 1px #33cc33;
  }
`;

const ToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #cccccc;
  transition: background-color 0.4s ease, transform 0.4s ease;
  border-radius: 20px;

  &:before {
    position: absolute;
    content: '';
    height: 16px;
    width: 16px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    transition: transform 0.4s ease;
    border-radius: 50%;
    transform: translateX(0);
  }
`;

const StyledToggle: React.FC<ToggleProps> = ({ enabled, onChange }) => {
  const [isChecked, setIsChecked] = useState(enabled);

  const handleToggle = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <ToggleContainer>
      <ToggleInput checked={isChecked} onChange={handleToggle} />
      <ToggleSlider />
    </ToggleContainer>
  );
};

export default StyledToggle;