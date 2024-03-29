import React, { useState } from 'react';
import { useApi } from '../../services/backend';
import { toast } from 'react-toastify';
import StyledButton from '../atoms/button';
import CustomInput from '../atoms/input';
import FlexDiv from '../atoms/flexDiv';
import { MAX_TIMEOUT, placeholderImage1 } from '../../utils/globals';
import StyledToggle from '../atoms/toggle';
import { executeOnEnter } from '../../utils/helpers';
import StyledHeading from '../atoms/heading';
import { useTabState } from '../../hooks/useAppState';
import { useHasPendingImageCall, useLastGeneratedImage } from '../../hooks/useGeneratedContent';
import { ContentPlayerWithInfo, DynamicImage } from '../molecules/content/contentPlayer';

const ImageGenerator: React.FC = () => {
    const [inputValue, setInputValue] = useState('');
    const [lastGeneratedImage, setLastGeneratedImage] = useLastGeneratedImage();
    const [upscalePrompt, setUpscalePrompt] = useState(false);
    const { setTab } = useTabState();
    const api = useApi();
    const [pendingRequest, setPendingRequest] = useHasPendingImageCall()

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleCheckboxChange = (newValue: boolean) => {
        setUpscalePrompt(newValue);
    };

    const handleButtonClick = async () => {
        toast('Processing your image. Feel free to browse, I will notify you when I\'m done.');
        try {
            setPendingRequest(true);
            let prompt = inputValue;
            let negPrompt = '';
            let name = prompt.substring(0, 16);
            if (upscalePrompt) {
                const response: { prompt: string; negPrompt: string, name: string } = (await api.post('promptToImagePrompt', { prompt: inputValue }, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })).data;
                prompt = response.prompt;
                negPrompt = response.negPrompt;
                name = response.name;
            }
            const response = await api.post('/promptToImage', { prompt, negPrompt, name }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                responseType: 'arraybuffer',
                timeout: MAX_TIMEOUT
            });

            setPendingRequest(false);
            setLastGeneratedImage(response.data);
            toast.success('Image generated! Navigate back to the Creation tab to view.',
            {
                onClick: () => {
                    setTab(2);
                },
            });
        } catch (error) {
            setPendingRequest(false);
            toast.error('Error creating image! Please try again.');
            console.error('Failed to call API:', error);
        }
    };

    return (<>
        <StyledHeading text='Image Generator' />
        <StyledHeading level='h3' text='Provide a prompt. Stable Diffusion XL will draw an image based on your prompt.' />
        <StyledHeading level='h4' text='Prompt enhancement will pre-process your prompt through GPT to try and get more details.' />
        <FlexDiv flexDirection='column'>
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
                <StyledButton onClick={handleButtonClick} disabled={pendingRequest}>Submit</StyledButton>
            </FlexDiv>
            {lastGeneratedImage ? <ContentPlayerWithInfo overrideItem={lastGeneratedImage} /> : <DynamicImage src={placeholderImage1} />}
        </FlexDiv>
    </>
    );
};

export default ImageGenerator;
