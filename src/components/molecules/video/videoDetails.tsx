import styled from 'styled-components';
import { formatDate, getShareURLFromVideoId } from '../../../utils/helpers';
import { Video } from '../../../hooks/useFetchContent';
import ShareLinks from '../shareLinks';

interface VideoDetailsProps {
  video: Video
}

const VideoDetails = ({ video }: VideoDetailsProps) => {
  return (
    <div>
      <MetadataContainer>
        <MetadataItem><BoldText>Prompt:</BoldText> {video.prompt}</MetadataItem>
        <MetadataItem><ShareLinks file={encodeURI(getShareURLFromVideoId(video.id, 'video'))} width='300px' justifyContent='flex-start' /> </MetadataItem>
        <MetadataItem><BoldText>Created On:</BoldText> {formatDate(video.created_at)}</MetadataItem>
      </MetadataContainer>
    </div>
  );
};

export default VideoDetails;

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
