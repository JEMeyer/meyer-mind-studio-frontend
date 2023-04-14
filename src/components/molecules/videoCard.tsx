import React, { useState } from 'react';
import styled from 'styled-components';
import VideoDetails from './videoDetails';
import Upvote from './upvote';
import FlexDiv from '../atoms/flexDiv';
import StyledHeading from '../atoms/heading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Video } from '../../hooks/useFetchVideos';
import { getVideoURLFromFilename } from '../../utils/helpers';

interface VideoCardProps {
  video: Video
}

const VideoCard = ({ video }: VideoCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <VideoCardContainer>
      <DynamicVideo src={`${getVideoURLFromFilename(video.public_path)}`} controls playsInline />
      <VideoMetadataContainer justifyContent='flex-start' alignItems='center'>
        <Upvote video={video} />
        <FlexDiv width='15px' />
        <ClickableArea onClick={toggleExpand} >
          <StyledHeading level='h2' text={video.name} marginBottom='0' />
          <FlexDiv flexGrow={1} justifyContent='flex-end' height='100%'>
            <StyledIcon
              icon={faChevronDown}
              style={{
                transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            />
          </FlexDiv>
        </ClickableArea>
      </VideoMetadataContainer>
      {isExpanded && (
        <ExpandableContent>
          <VideoDetails video={video} />
        </ExpandableContent>
      )}
    </VideoCardContainer>
  );
};

export default VideoCard;

// Styled-components wrapper for the VideoCard container
const VideoCardContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 15px;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const ExpandableContent = styled.div`
  margin-top: 15px;
  max-width: 512px;

  // You can customize the responsive breakpoints here
  @media (max-width: 640px) {
    max-width: 100%;
  }
`;

export const DynamicVideo = styled.video`
  height: auto;
  margin-bottom: 10px;
  display: block;

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

const StyledIcon = styled(FontAwesomeIcon)`
  transition: transform 0.3s ease;
`;

const VideoMetadataContainer = styled(FlexDiv)`
  max-width: 512px;

  // You can customize the responsive breakpoints here
  @media (max-width: 640px) {
    max-width: 100%;
  }
`;

const ClickableArea = styled(FlexDiv)`
  cursor: pointer;
  width: 100%;
`;
