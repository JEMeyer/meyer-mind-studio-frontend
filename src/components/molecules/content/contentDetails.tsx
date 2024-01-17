import styled from 'styled-components';
import { formatDate, getShareURLFromVideoId } from '../../../utils/helpers';
import ShareLinks from '../shareLinks';
import { Item } from '../../../hooks/useFetchContent';

interface ContentDetailsProps {
    item: Item
}

const ContentDetails = ({ item }: ContentDetailsProps) => {
  return (
    <div>
      <MetadataContainer>
        <MetadataItem><BoldText>Prompt:&nbsp;</BoldText> {item.prompt}</MetadataItem>
        <MetadataItem><ShareLinks file={encodeURI(getShareURLFromVideoId(item.id, item.type))} width='300px' justifyContent='flex-start' /> </MetadataItem>
        <MetadataItem><BoldText>Created On:&nbsp;</BoldText> {formatDate(item.created_at)}</MetadataItem>
      </MetadataContainer>
    </div>
  );
};

export default ContentDetails;

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
