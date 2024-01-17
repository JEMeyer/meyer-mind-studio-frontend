import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from 'styled-components';
import { useMediaState } from '../../../hooks/useMediaState';
import ShareLinks from '../shareLinks';
import { getShareURLFromVideoId, getVideoURLFromPath } from '../../../utils/helpers';

const ContentModalContent = () => {
  const [item,] = useMediaState();

  const renderMedia = () => {
    if (item?.type === "picture") {
      return <DynamicImage src={getVideoURLFromPath(item.public_path)} alt={item.prompt} />;
    } else if (item?.type === "video") {
      return <DynamicVideo src={getVideoURLFromPath(item.public_path)} controls />;
    }
    return null;
  };

  return (
    <StyledBox p={2} style={{ textAlign: "left" }}>
      {renderMedia()}
      <Typography variant="h6" gutterBottom>
        {item?.prompt}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Created on: {item?.created_at}
      </Typography>
      <ShareLinks file={encodeURI(getShareURLFromVideoId(item?.id ?? '', item?.type ?? 'picture'))} />
    </StyledBox>
  );
};
export { ContentModalContent };

const StyledBox = styled(Box)`
    max-width: 560px;
`;


export const DynamicImage = styled.img`
  height: auto;
  margin-bottom: 10px;
  display: block;
  max-height: 80vh;

  // You can customize the responsive breakpoints here
  @media (max-width: 640px) {
    width: 100%;
  }

  &::-webkit-media-controls {
    display: none;
  }

  &:hover::-webkit-media-controls {
    display: inline-flex;
  }
`;

export const DynamicVideo = styled.video`
  height: auto;
  margin-bottom: 10px;
  display: block;
  max-height: 80vh;

  // You can customize the responsive breakpoints here
  @media (max-width: 640px) {
    width: 100%;
  }

  &::-webkit-media-controls {
    display: none;
  }

  &:hover::-webkit-media-controls {
    display: inline-flex;
  }
`;
