import React from 'react';
import styled from 'styled-components';

interface CustomButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  small?: boolean;
  margin?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ onClick, children, small, margin }) => {
  return <StyledButton onClick={onClick} small={small} margin={margin}>{children}</StyledButton>;
};

export default CustomButton;

interface StyledButtonProps {
  small?: boolean,
  margin?: string
}

const StyledButton = styled.button<StyledButtonProps>`
  background-color: #007bff;
  color: #fff;
  font-size: ${({ small }) => small ? '12px' : '16px'};
  border: none;
  border-radius: 4px;
  padding: ${({ small }) => small ? '5px 10px' : '10px 20px'};
  margin: ${({ margin }) => margin || '5px' };
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