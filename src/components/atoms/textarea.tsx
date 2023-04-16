import React, { useLayoutEffect, useRef } from 'react';
import styled from 'styled-components';

const AutoExpandTextarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = (props) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  };

  useLayoutEffect(() => {
    adjustHeight();
  }, [props.value]);

  return <StyledTextarea {...props} ref={textAreaRef} />;
};

export default AutoExpandTextarea;

const StyledTextarea = styled.textarea`
  width: 100%;
  min-height: 40px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  outline: none;
  resize: none; // Disable manual resizing
  overflow-y: hidden;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;
