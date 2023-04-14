import React, { useState } from 'react';
import { useApi } from '../../services/backend';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import StyledButton from '../atoms/button';
import FlexDiv from '../atoms/flexDiv';
import { StyledTextarea } from '../atoms/textarea';
import { placeholderImage2 } from '../../utils/globals';
import ShareLinks from '../molecules/shareLinks';
import { executeOnEnter, getVideoURLFromFilename } from '../../utils/helpers';
import { DynamicVideo } from '../molecules/videoCard';
import { useLastGeneratedStoryboardUrlState, useLastSubmittedStoryboardPromptState, useTabState } from '../../hooks/useAppState';
import StyledHeading from '../atoms/heading';

const StoryboardGenerator: React.FC = () => {
    const { lastGeneratedStoryboardUrl, setLastGeneratedStoryboardUrl } = useLastGeneratedStoryboardUrlState();
    const { lastSubmittedStoryboardPrompt, setLastSubmittedStoryboardPrompt } = useLastSubmittedStoryboardPromptState();
    const [inputValue, setInputValue] = useState(lastSubmittedStoryboardPrompt);
    const { setTab } = useTabState();
    const api = useApi();

    const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(event.target.value);
    };

    const handleButtonClick = async () => {
        toast('Processing your storyboard. Feel free to browse, I will notify you when I\'m done.');
        try {
            const response = await api.post('/promptToStoryboard', { prompt: inputValue }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Update the toast to success
            toast.success('Storyboard generated! Navigate back to the Creation tab to view.',
                {
                    onClick: () => {
                        setTab(2);
                    },
                });
            setLastSubmittedStoryboardPrompt(inputValue);
            setLastGeneratedStoryboardUrl(`${getVideoURLFromFilename(response.data.filePath)}`);
        } catch (error) {
            // Update the toast to error
            toast.error('Error creating storyboard! Please try again.');
            console.error('Failed to call API:', error);
        }
    };

    return (<>
        <StyledHeading text='Storyboard Generator' />
        <StyledHeading level='h3' text='Provide a prompt. Based on this prompt, a video will be generated purely with AI tools including: GPT, Stable Diffusion, and Coqui.' />
        <FlexDiv flexDirection='column'>
            {lastGeneratedStoryboardUrl ? <DynamicVideo src={lastGeneratedStoryboardUrl} controls playsInline /> : <CentralImage src={placeholderImage2} />}
            {lastGeneratedStoryboardUrl && <ShareLinks file={encodeURI(lastGeneratedStoryboardUrl)} />}
            <FlexDiv justifyContent='flex-end' flexWrap='wrap' width='100%'>
                <StyledTextarea
                    value={inputValue}
                    onChange={handleTextareaChange}
                    onKeyDown={(event) => executeOnEnter(event, handleButtonClick)}
                />
                <FlexDiv height='5px' width='100%' />
                <StyledButton onClick={handleButtonClick}>Submit</StyledButton>
            </FlexDiv>
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
