// src/ExampleComponent.tsx
import React, { useState } from 'react';
import { useApi } from '../../services/backend';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import StyledButton from '../atoms/button';
import FlexDiv from '../atoms/flexDiv';
import { StyledTextarea } from '../atoms/textarea';
import { placeholderImage2 } from '../../utils/globals';
import { LoadingOverlay, Spinner } from './loadingOverlay';

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
                responseType: 'arraybuffer',
            });
            setLoading(false);

            const blob = new Blob([response.data], { type: 'video/mp4' });
            const reader = new FileReader();
            reader.onload = (event) => {
                setImageDataUrl(event.target?.result as string);
            };
            reader.readAsDataURL(blob);
        } catch (error) {
            toast.error(`Failed :( ${error}`, {
                position: "top-center", theme: 'dark'
            })
            console.error('Failed to call API:', error);
        }
    };

    return (
        <FlexDiv flexDirection='column'>
            {imageDataUrl ? <CentralVideo src={imageDataUrl} controls/> : <CentralImage src={placeholderImage2} alt="Generated image" />}
            <FlexDiv width='512px'justifyContent='flex-end' flexWrap='wrap'>
                <StyledTextarea
                    value={inputValue}
                    onChange={handleTextareaChange}
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
  width: 512px;
  height: 512px;
  object-fit: cover;
  margin-bottom: 10px;
`;

const CentralImage = styled.img`
  width: 512px;
  height: 512px;
  object-fit: cover;
  margin-bottom: 10px;
`;