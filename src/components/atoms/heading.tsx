import React from 'react';
import styled from 'styled-components';

interface StyledHeadingProps {
  text: string;
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  color?: string;
  marginBottom?: string;
}

const StyledHeading: React.FC<StyledHeadingProps> = ({
  text,
  level = 'h1',
  color = '#333',
  marginBottom = '16px',
}) => {
  const HeadingTag = level;

  return <StyledTag as={HeadingTag} color={color} marginBottom={marginBottom}>{text}</StyledTag>;
};

export default StyledHeading;

interface StyledTagProps {
  color: string;
  marginBottom: string;
}

const StyledTag = styled.h1<StyledTagProps>`
  color: ${({ color }) => color};
  margin-top: 0;
  margin-bottom:  ${({ marginBottom }) => marginBottom};
  line-height: 1.2;
  font-weight: 600;
`;
