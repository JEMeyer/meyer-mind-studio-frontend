import React, { useState } from 'react';
import { useApi } from '../../services/backend';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import StyledButton from '../atoms/button';
import FlexDiv from '../atoms/flexDiv';
import AutoExpandTextarea from '../atoms/textarea';
import { placeholderImage2 } from '../../utils/globals';
import ShareLinks from '../molecules/shareLinks';
import { executeOnEnter, getShareURLFromVideoId, getVideoURLFromFilename } from '../../utils/helpers';
import { DynamicVideo } from '../molecules/videoCard';
import { useTabState } from '../../hooks/useAppState';
import StyledHeading from '../atoms/heading';
import { useHasPendingVideoCall, useLastGeneratedVideoId, useLastGeneratedVideoURL, useLastSubmittedVideoPrompt } from '../../hooks/useGeneratedContent';

const StoryboardGenerator: React.FC = () => {
    const [lastGeneratedStoryboardUrl, setLastGeneratedStoryboardUrl] = useLastGeneratedVideoURL();
    const [lastSubmittedStoryboardPrompt, setLastSubmittedStoryboardPrompt] = useLastSubmittedVideoPrompt();
    const [lastGeneratedVideoId, setLastGeneratedVideoId] = useLastGeneratedVideoId();
    const defaultPrompt = 'Two Frogs discuss the merits of Anarcho-syndicalism. One frog has the voice of an old british man, but the other frog has the voice of a young american girl.';
    const [inputValue, setInputValue] = useState(lastSubmittedStoryboardPrompt || defaultPrompt);
    const { setTab } = useTabState();
    const api = useApi();
    const [pendingRequest, setPendingRequest] = useHasPendingVideoCall();

    const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(event.target.value);
    };

    const handleButtonClick = async () => {
        if (!inputValue) {
            toast.error('Please enter a prompt.');
            return;
        }

        toast('Processing your storyboard. Feel free to browse, I will notify you when I\'m done.');
        try {
            setPendingRequest(true);
            if (inputValue === defaultPrompt) {
                await new Promise(resolve => setTimeout(resolve, 5000));
                setPendingRequest(false);
                setLastSubmittedStoryboardPrompt(inputValue);
                setLastGeneratedStoryboardUrl('https://storyboard.meyer.id/static/6a286899-7134-44cd-ae0f-a36455689298-Frogs Debate Anarcho-syndicalism.mp4');
                setLastGeneratedVideoId('237');
                
            } else {
                const response = await api.post('/promptToStoryboard', { prompt: inputValue }, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                setPendingRequest(false);
                setLastSubmittedStoryboardPrompt(inputValue);
                setLastGeneratedStoryboardUrl(`${getVideoURLFromFilename(response.data.filePath)}`);
                setLastGeneratedVideoId(response.data.videoId);
            }
            // Update the toast to success
            toast.success('Storyboard generated! Navigate back to the Creation tab to view.',
                {
                    onClick: () => {
                        setTab(2);
                    },
                });
        } catch (error) {
            // Update the toast to error
            setPendingRequest(false);
            toast.error('Error creating storyboard! Please try again.');
            console.error('Failed to call API:', error);
        }
    };

    return (<>
        <StyledHeading text='Storyboard Generator' />
        <StyledHeading level='h3' text='Provide a prompt. A video will be generated using the GenAI tools: GPT, Stable Diffusion, and Coqui.' />
        <StyledHeading level='h4' text='Generated videos are automatically shared to the leaderboard on the main page.' />
        <FlexDiv flexDirection='column'>
            <FlexDiv justifyContent='flex-end' flexWrap='wrap' width='100%'>
                <AutoExpandTextarea
                    value={inputValue}
                    onChange={handleTextareaChange}
                    onKeyDown={(event) => executeOnEnter(event, handleButtonClick)}
                />
                <FlexDiv height='5px' width='100%' />
                <StyledButton onClick={handleButtonClick} disabled={pendingRequest}>Submit</StyledButton>
            </FlexDiv>
            {lastGeneratedStoryboardUrl ? <DynamicVideo src={lastGeneratedStoryboardUrl} controls playsInline /> : <CentralImage src={placeholderImage2} />}
            {lastGeneratedVideoId && <ShareLinks file={encodeURI(getShareURLFromVideoId(lastGeneratedVideoId))} />}
        </FlexDiv>
    </>
    );
};

export default StoryboardGenerator;

const CentralImage = styled.img`
    height: auto;
    margin-bottom: 10px;
    display: block;

    // You can customize the responsive breakpoints here
    @media (max-width: 640px) {
        width: 100%;
    }
`;
