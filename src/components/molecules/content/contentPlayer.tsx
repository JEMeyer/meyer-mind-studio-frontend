import React from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "styled-components";
import { useMediaState } from "../../../hooks/useMediaState";
import ShareLinks from "../shareLinks";
import {
  formatDate,
  getShareURLFromVideoId,
  getImageURLFromPath,
} from "../../../utils/helpers";
import { Item } from "../../../hooks/useFetchContent";

type ContentModalContentProps = {
  overrideItem?: Item;
};

const ContentPlayerWithInfo = ({ overrideItem }: ContentModalContentProps) => {
  const [item] = useMediaState();

  const itemToUse = overrideItem ?? item;

  if (!item) return <></>;

  const renderMedia = () => {
    if (itemToUse?.type === "picture") {
      return (
        <DynamicImage
          src={getImageURLFromPath(itemToUse.public_path)}
          alt={itemToUse.prompt}
        />
      );
    } else if (itemToUse?.type === "video") {
      return (
        <DynamicVideo
          src={getImageURLFromPath(itemToUse.public_path)}
          controls
          autoPlay
        />
      );
    }
    return null;
  };

  return (
    <StyledBox p={2} style={{ textAlign: "left" }}>
      {renderMedia()}
      <Typography variant="h6" gutterBottom>
        {itemToUse?.prompt}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Created on: {formatDate(itemToUse?.created_at)}
      </Typography>
      <ShareLinks
        file={encodeURI(
          getShareURLFromVideoId(itemToUse?.id ?? "", itemToUse?.type ?? "picture")
        )}
      />
    </StyledBox>
  );
};
export { ContentPlayerWithInfo };

export const StyledBox = styled(Box)`
  max-width: 600px;
`;

export const DynamicImage = styled.img`
  height: auto;
  margin-bottom: 10px;
  display: block;
  width: 100%;

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
  width: 100%;

  &::-webkit-media-controls {
    display: none;
  }

  &:hover::-webkit-media-controls {
    display: inline-flex;
  }
`;
