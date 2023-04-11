// src/ExampleComponent.tsx
import React, { useState } from 'react';
import { useApi } from '../../services/backend';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import StyledButton from '../atoms/button';
import CustomInput from '../atoms/input';
import FlexDiv from '../atoms/flexDiv';
import { placeholderImage1 } from '../../utils/globals';
import { Spinner, LoadingOverlay } from './loadingOverlay';
import StyledToggle from '../atoms/toggle';

const ImageGenerator: React.FC = () => {
    const [inputValue, setInputValue] = useState('');
    const [imageDataUrl, setImageDataUrl] = useState('');
    const [upscalePrompt, setUpscalePrompt] = useState(true);
    const [loading, setLoading] = useState(false);
    const api = useApi();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleCheckboxChange = (newValue: boolean) => {
        setUpscalePrompt(newValue);
    };

    const handleButtonClick = async () => {
        try {
            setLoading(true);
            let finalPrompt = inputValue;
            if (upscalePrompt) {
                finalPrompt = (await api.post('promptToImagePrompt', { prompt: inputValue }, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })).data;
            }
            const response = await api.post('/promptToImage', { prompt: finalPrompt }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                responseType: 'arraybuffer',
            });
            setLoading(false);

            const blob = new Blob([response.data], { type: 'image/png' });
            const reader = new FileReader();
            reader.onload = (event) => {
                setImageDataUrl(event.target?.result as string);
            };
            reader.readAsDataURL(blob);
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
            <CentralImage src={imageDataUrl || placeholderImage1} alt="Generated image" />
            <FlexDiv width='512px' justifyContent='flex-end' flexWrap='wrap'>
                <CustomInput
                    value={inputValue}
                    onChange={handleInputChange}
                    width='100%'
                />
                <FlexDiv height='40px'>
                    <span>Prompt Enhancement</span>
                    <FlexDiv width='5px' />
                    <StyledToggle enabled={upscalePrompt} onChange={handleCheckboxChange} />
                </FlexDiv>
                <FlexDiv width='100%' />
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

export default ImageGenerator;

const CentralImage = styled.img`
  width: 512px;
  height: 512px;
  object-fit: cover;
  margin-bottom: 10px;
`;