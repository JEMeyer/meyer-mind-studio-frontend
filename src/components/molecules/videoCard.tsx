import React, { useState } from 'react';
import styled from 'styled-components';
import VideoDetails from './videoDetails';
import { Video, getVideoURLFromFilename } from '../../state/videoState';

interface VideoCardProps {
  video: Video
}

const VideoCard = ({ video }: VideoCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <VideoCardContainer onClick={toggleExpand}>
      <DynamicVideo src={`${getVideoURLFromFilename(video.public_path)}`} controls />
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
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const ExpandableContent = styled.div`
  margin-top: 15px;
`;

const DynamicVideo = styled.video`
  height: auto;
  margin-bottom: 10px;
  display: block;

  // You can customize the responsive breakpoints here
  @media (max-width: 640px) {
    width: 100%;
  }
`;
