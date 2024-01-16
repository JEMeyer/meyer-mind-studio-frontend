import React, { useState } from 'react';
import styled from 'styled-components';
import ImageDetails from './imageDetails';
import Upvote from '../upvote';
import FlexDiv from '../../atoms/flexDiv';
import StyledHeading from '../../atoms/heading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { ContentType } from '../../../hooks/useFetchContent';
import { Image } from '../../../hooks/useFetchContent';
import { getImageURLFromPath } from '../../../utils/helpers';

interface ImageCardProps {
  image: Image
}

const ImageCard = ({ image }: ImageCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <ImageCardContainer>
      <DynamicImage src={getImageURLFromPath(image.public_path)} />
      <ImageMetadataContainer justifyContent='flex-start' alignItems='center'>
        <Upvote item={image} contentType={ContentType.PICTURE} />
        <FlexDiv width='15px' />
        <ClickableArea onClick={toggleExpand} >
          <StyledHeading level='h2' text={image.name ?? 'Generated Image'} marginBottom='0' />
          <FlexDiv flexGrow={1} justifyContent='flex-end' height='100%'>
            <StyledIcon
              icon={faChevronDown}
              style={{
                transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            />
          </FlexDiv>
        </ClickableArea>
      </ImageMetadataContainer>
      {isExpanded && (
        <ExpandableContent>
          <ImageDetails image={image} />
        </ExpandableContent>
      )}
    </ImageCardContainer>
  );
};

export default ImageCard;

// Styled-components wrapper for the VideoCard container
const ImageCardContainer = styled.div`
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

export const DynamicImage = styled.img`
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

const ImageMetadataContainer = styled(FlexDiv)`
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
