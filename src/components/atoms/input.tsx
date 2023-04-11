import React, { ChangeEvent }  from 'react';
import styled from 'styled-components';

interface CustomInputProps {
  type?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  width?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({ type = 'text', value, onChange, placeholder, width }) => {
  return (
    <InputWrapper width={width}>
      <StyledInput type={type} value={value} onChange={onChange} placeholder={placeholder} />
    </InputWrapper>
  );
};

export default CustomInput;

interface InputWrapperProps {
  width?: string;
}

const InputWrapper = styled.div<InputWrapperProps>`
  display: inline-block;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0;
  position: relative;
  transition: all 0.3s ease;
  width: ${({ width }) => width || 'auto'};

  &:focus-within {
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

const StyledInput = styled.input`
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 16px;
  padding: 12px;
  width: 100%;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #999;
  }
`;