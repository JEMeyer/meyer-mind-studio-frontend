import React from 'react';
import styled from 'styled-components';

interface FlexDivProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string;
  justifyContent?: React.CSSProperties['justifyContent'];
  alignItems?: React.CSSProperties['alignItems'];
  flexDirection?: React.CSSProperties['flexDirection'];
  flexWrap?: React.CSSProperties['flexWrap'];
}

const FlexDiv: React.FC<FlexDivProps> = ({
  width,
  justifyContent,
  alignItems,
  flexDirection,
  flexWrap,
  ...props
}) => {
  return (
    <StyledFlexDiv
      width={width}
      justifyContent={justifyContent}
      alignItems={alignItems}
      flexDirection={flexDirection}
      flexWrap={flexWrap}
      {...props}
    />
  );
};

export default FlexDiv;

const StyledFlexDiv = styled.div<FlexDivProps>`
  display: flex;
  width: ${({ width }) => width || 'auto'};
  justify-content: ${({ justifyContent }) => justifyContent || 'center'};
  align-items: ${({ alignItems }) => alignItems || 'center'};
  flex-direction: ${({ flexDirection }) => flexDirection || 'row'};
  flex-wrap: ${({ flexWrap }) => flexWrap || 'nowrap'};
`;
