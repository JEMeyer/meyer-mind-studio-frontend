import styled from 'styled-components';

export const StyledTextarea = styled.textarea`
  width: 100%;
  min-height: 40px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  outline: none;
  resize: none; // Disable manual resizing

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;