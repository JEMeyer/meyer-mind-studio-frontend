import styled from 'styled-components';
import { formatDate, getShareURLFromVideoId } from '../../utils/helpers';
import { Video } from '../../hooks/useFetchVideos';
import ClipboardCopy from './clipboardCopy';

interface VideoDetailsProps {
  video: Video
}

const VideoDetails = ({ video }: VideoDetailsProps) => {
  return (
    <div>
      <MetadataContainer>
        <MetadataItem><BoldText>Prompt:</BoldText> {video.prompt}</MetadataItem>
        <MetadataItem><BoldText>Link (click to copy):</BoldText> <ClipboardCopy text={encodeURI(getShareURLFromVideoId(video.id))} /> </MetadataItem>
        <MetadataItem><BoldText>Created On:</BoldText> {formatDate(video.created_at)}</MetadataItem>
      </MetadataContainer>
    </div>
  );
};

export default VideoDetails;

const MetadataContainer = styled.div`
  margin-top: 1rem;
`;

const MetadataItem = styled.p`
  margin: 0.25rem 0;
`;

const BoldText = styled.span`
  font-weight: bold;
`;