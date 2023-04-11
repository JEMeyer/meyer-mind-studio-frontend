import React from 'react';
import styled from 'styled-components';

interface CustomButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({ onClick, children }) => {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
};

export default CustomButton;

const StyledButton = styled.button`
  background-color: #007bff;
  color: #fff;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  margin: 5px;
  cursor: pointer;
  outline: none;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #0056b3;
  }
  &:active {
    background-color: #004499;
  }
  &:disabled {
    background-color: #999;
    cursor: not-allowed;
  }
`;