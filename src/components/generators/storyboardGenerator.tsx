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

const StoryboardGenerator: React.FC = () => {
    const { lastGeneratedStoryboardUrl, setLastGeneratedStoryboardUrl } = useLastGeneratedStoryboardUrlState(); 
    const { lastSubmittedStoryboardPrompt, setLastSubmittedStoryboardPrompt} = useLastSubmittedStoryboardPromptState();
    const [inputValue, setInputValue] = useState(lastSubmittedStoryboardPrompt);
    const { setTab } = useTabState();
    const api = useApi();

    const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(event.target.value);
    };

    const handleButtonClick = async () => {
        const processingToast = toast('Processing your storyboard. Feel free to browse, I will notify you when I\'m done.', {
            position: 'top-right',
            autoClose: false,
            closeOnClick: false,
            closeButton: false,
            draggable: false,
        });
        try {
            const response = await api.post('/promptToStoryboard', { prompt: inputValue }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Update the toast to success
            toast.update(processingToast, {
                render: 'Success! Click to view your new storyboard.',
                type: toast.TYPE.SUCCESS,
                autoClose: 5000,
                closeButton: true,
                closeOnClick: true,
                onClick: () => {
                    setTab(2);
                },
            });
            setLastSubmittedStoryboardPrompt(inputValue);
            setLastGeneratedStoryboardUrl(`${getVideoURLFromFilename(response.data.filePath)}`);
        } catch (error) {
            // Update the toast to error
            toast.update(processingToast, {
                render: 'Error! Please try again',
                type: toast.TYPE.ERROR,
                autoClose: 5000,
                closeButton: true,
                closeOnClick: true,
            });
            console.error('Failed to call API:', error);
        }
    };

    return (
        <FlexDiv flexDirection='column'>
            {lastGeneratedStoryboardUrl ? <DynamicVideo src={lastGeneratedStoryboardUrl} controls /> : <CentralImage src={placeholderImage2} />}
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
