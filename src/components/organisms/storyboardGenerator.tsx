import React, { useState } from 'react';
import { useApi } from '../../services/backend';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import StyledButton from '../atoms/button';
import FlexDiv from '../atoms/flexDiv';
import AutoExpandTextarea from '../atoms/textarea';
import { MAX_TIMEOUT, placeholderImage2 } from '../../utils/globals';
import { executeOnEnter } from '../../utils/helpers';
import VideoCard from '../molecules/videoCard';
import { useTabState } from '../../hooks/useAppState';
import StyledHeading from '../atoms/heading';
import { useHasPendingVideoCall, useLastGeneratedVideo } from '../../hooks/useGeneratedContent';

const StoryboardGenerator: React.FC = () => {
    const [lastGeneratedVideo, setLastGeneratedVideo] = useLastGeneratedVideo();
    const defaultPrompt = 'Two Frogs discuss the merits of Anarcho-syndicalism. One frog has the voice of an old british man, but the other frog has the voice of a young american girl.';
    const [inputValue, setInputValue] = useState(lastGeneratedVideo?.prompt || defaultPrompt);
    const { setTab } = useTabState();
    const api = useApi();
    const [pendingRequest, setPendingRequest] = useHasPendingVideoCall();

    const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(event.target.value);
    };

    const goHome = () => {
        setTab(1);
    }

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
                const video = (await api.get('/videos/237')).data;
                setPendingRequest(false);
                setLastGeneratedVideo(video);

            } else {
                const response = await api.post('/promptToStoryboard', { prompt: inputValue }, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    timeout: MAX_TIMEOUT
                });
                setPendingRequest(false);
                setLastGeneratedVideo(response.data);
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
        <StyledHeading level='h3' text='Provide a prompt. A storyboard will be generated end-to-end with the AI products: GPT, Coqui, and Stable Diffusion.' />
        <StyledHeading level='h4' text='Generated videos are automatically shared to the leaderboard on the main page.' />
        <FlexDiv flexDirection='column'>
            <FlexDiv justifyContent='flex-end' flexWrap='wrap' width='100%'>
                <AutoExpandTextarea
                    value={inputValue}
                    onChange={handleTextareaChange}
                    onKeyDown={(event) => executeOnEnter(event, handleButtonClick)}
                />
                <FlexDiv height='5px' width='100%' />
                {pendingRequest && <StyledButton onClick={goHome}>Homepage</StyledButton>}
                <StyledButton onClick={handleButtonClick} disabled={pendingRequest}>Submit</StyledButton>
            </FlexDiv>
            {lastGeneratedVideo ? <VideoCard video={lastGeneratedVideo} /> : <CentralImage src={placeholderImage2} />}
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
