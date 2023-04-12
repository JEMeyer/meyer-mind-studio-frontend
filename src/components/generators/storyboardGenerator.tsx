import React, { useState } from 'react';
import { useApi } from '../../services/backend';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import StyledButton from '../atoms/button';
import FlexDiv from '../atoms/flexDiv';
import { StyledTextarea } from '../atoms/textarea';
import { placeholderImage2 } from '../../utils/globals';
import { LoadingOverlay, Spinner } from '../molecules/loadingOverlay';
import ShareLinks from '../molecules/shareLinks';
import { executeOnEnter } from '../../utils/utilities';

const StoryboardGenerator: React.FC = () => {
    const [inputValue, setInputValue] = useState('');
    const [imageDataUrl, setImageDataUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const api = useApi();

    const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(event.target.value);
    };

    const handleButtonClick = async () => {
        try {
            setLoading(true);
            const response = await api.post('/promptToStoryboard', { prompt: inputValue }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setLoading(false);

            setImageDataUrl(`${process.env.REACT_APP_MEYER_MIND_BACKEND_URL}${response.data.filePath}`)
        } catch (error) {
            toast.error(`Failed :( ${error}`, {
                position: "top-center", theme: 'dark'
            })
            setLoading(false);
            console.error('Failed to call API:', error);
        }
    };

    return (
        <FlexDiv flexDirection='column'>
            {imageDataUrl ? <CentralVideo src={imageDataUrl} controls/> : <CentralImage src={placeholderImage2} />}
            {imageDataUrl && <ShareLinks file={encodeURI(imageDataUrl)} />}
            <FlexDiv justifyContent='flex-end' flexWrap='wrap' width='100%'>
                <StyledTextarea
                    value={inputValue}
                    onChange={handleTextareaChange}
                    onKeyDown={(event) => executeOnEnter(event, handleButtonClick)}
                />
                <FlexDiv height='5px' width='100%' />
                <StyledButton onClick={handleButtonClick}>Submit</StyledButton>
            </FlexDiv>
            {loading && (
                <LoadingOverlay>
                    <Spinner />
                </LoadingOverlay>
            )}
        </FlexDiv>
    );
};

export default StoryboardGenerator;

const CentralVideo = styled.video`
  max-width: 100%;
  height: auto;
  margin-bottom: 10px;
`;

const CentralImage = styled.img`
  max-width: 100%;
  height: auto;
  margin-bottom: 10px;
`;