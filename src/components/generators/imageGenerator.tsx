import React, { useState } from 'react';
import { useApi } from '../../services/backend';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import StyledButton from '../atoms/button';
import CustomInput from '../atoms/input';
import FlexDiv from '../atoms/flexDiv';
import { placeholderImage1 } from '../../utils/globals';
import { Spinner, LoadingOverlay } from '../molecules/loadingOverlay';
import StyledToggle from '../atoms/toggle';
import { executeOnEnter } from '../../utils/helpers';
import StyledHeading from '../atoms/heading';

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

    return (<>
        <StyledHeading text='Image Generator' />
        <StyledHeading level='h3' text='Provide a prompt. Stable Diffusion will draw an image based on your prompt.' />
        <StyledHeading level='h4' text='Unlike storyboards, images are not saved server-side. If you like an image, save it to your device.' />
        <StyledHeading level='h4' text='Prompt enhancement will pre-process your prompt through GPT to try and get more details.' />
        <FlexDiv flexDirection='column'>
            <CentralImage src={imageDataUrl || placeholderImage1} />
            <FlexDiv justifyContent='flex-end' flexWrap='wrap'>
                <CustomInput
                    value={inputValue}
                    onChange={handleInputChange}
                    width='100%'
                    onKeyDown={(event) => executeOnEnter(event, handleButtonClick)}
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
        </>
    );
};

export default ImageGenerator;

const CentralImage = styled.img`
    height: auto;
    margin-bottom: 10px;
    display: block;

    // You can customize the responsive breakpoints here
    @media (max-width: 640px) {
        width: 100%;
    }
`;