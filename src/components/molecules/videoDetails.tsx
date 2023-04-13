import styled from 'styled-components';
import { Video, getVideoURLFromFilename } from '../../state/videoState';
import { toast } from 'react-toastify';
import { formatDate } from '../../utils/utilities';

const MetadataContainer = styled.div`
  margin-top: 1rem;
`;

const MetadataItem = styled.p`
  margin: 0.25rem 0;
`;

const VotingSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const VotingButton = styled.button`
  background-color: #007bff;
  border: none;
  color: white;
  font-size: 16px;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }
`;

const Score = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

interface VideoDetailsProps {
  video: Video
}

const VideoDetails = ({video}: VideoDetailsProps  ) => {
  const handleVote = () => {
    // Handle upvote logic here
    toast('Coming  Soon');
  };

  return (
    <div>
      <h3>{video.name}</h3>
      <MetadataContainer>
        <MetadataItem>Prompt: {video.prompt}</MetadataItem>
        <MetadataItem>Link: <a href={encodeURI(getVideoURLFromFilename(video.public_path))}>{video.name}</a></MetadataItem>
        <MetadataItem>Created on: {formatDate(video.created_at)}</MetadataItem>
      </MetadataContainer>
      <VotingSection>
        <VotingButton onClick={handleVote}>Upvote</VotingButton>
        <VotingButton onClick={handleVote}>Downvote</VotingButton>
        <Score>Score: {video.total_votes || 0}</Score>
      </VotingSection>
    </div>
  );
};

export default VideoDetails;
