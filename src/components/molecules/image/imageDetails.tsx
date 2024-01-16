import styled from 'styled-components';
import { formatDate, getShareURLFromVideoId } from '../../../utils/helpers';
import { Image } from '../../../hooks/useFetchImages';
import ShareLinks from '../shareLinks';

interface ImageDetailsProps {
    image: Image
}

const ImageDetails = ({ image }: ImageDetailsProps) => {
  return (
    <div>
      <MetadataContainer>
        <MetadataItem><BoldText>Prompt:</BoldText> {image.prompt}</MetadataItem>
        <MetadataItem><ShareLinks file={encodeURI(getShareURLFromVideoId(image.id))} width='300px' justifyContent='flex-start' /> </MetadataItem>
        <MetadataItem><BoldText>Created On:</BoldText> {formatDate(image.created_at)}</MetadataItem>
      </MetadataContainer>
    </div>
  );
};

export default ImageDetails;

const MetadataContainer = styled.div`
  margin-top: 1rem;
`;

const MetadataItem = styled.div`
  margin: 0.25rem 0;
  display: flex;
  justify-content:  flex-start;
  align-items: center;
`;

const BoldText = styled.span`
  font-weight: bold;
`;
