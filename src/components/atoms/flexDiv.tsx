import React from 'react';
import styled from 'styled-components';

interface FlexDivProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string;
  height?: string;
  justifyContent?: React.CSSProperties['justifyContent'];
  alignItems?: React.CSSProperties['alignItems'];
  flexDirection?: React.CSSProperties['flexDirection'];
  flexWrap?: React.CSSProperties['flexWrap'];
  flexGrow?: React.CSSProperties['flexGrow'];
}

const FlexDiv: React.FC<FlexDivProps> = ({
  width,
  height,
  justifyContent,
  alignItems,
  flexDirection,
  flexWrap,
  flexGrow,
  ...props
}) => {
  return (
    <StyledFlexDiv
      width={width}
      height={height}
      justifyContent={justifyContent}
      alignItems={alignItems}
      flexDirection={flexDirection}
      flexWrap={flexWrap}
      flexGrow={flexGrow}
      {...props}
    />
  );
};

export default FlexDiv;

const StyledFlexDiv = styled.div<FlexDivProps>`
  display: flex;
  width: ${({ width }) => width || 'auto'};
  height: ${({ height }) => height || 'auto'};
  justify-content: ${({ justifyContent }) => justifyContent || 'center'};
  align-items: ${({ alignItems }) => alignItems || 'center'};
  flex-direction: ${({ flexDirection }) => flexDirection || 'row'};
  flex-wrap: ${({ flexWrap }) => flexWrap || 'nowrap'};
  flex-grow: ${({ flexGrow }) => flexGrow || '0'};
`;
