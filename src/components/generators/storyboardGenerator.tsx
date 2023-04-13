import React, { useState } from 'react';
import { useApi } from '../../services/backend';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import StyledButton from '../atoms/button';
import FlexDiv from '../atoms/flexDiv';
import { StyledTextarea } from '../atoms/textarea';
import { placeholderImage2 } from '../../utils/globals';
import ShareLinks from '../molecules/shareLinks';
import { executeOnEnter } from '../../utils/utilities';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { lastGenerateStoryboardUrlState, tabState } from '../../state/appState';
import { getVideoURLFromFilename } from '../../state/videoState';
import { DynamicVideo } from '../molecules/videoCard';

const StoryboardGenerator: React.FC = () => {
    const [inputValue, setInputValue] = useState('');
    const [imageDataUrl, setImageDataUrl] = useRecoilState(lastGenerateStoryboardUrlState);
    const setActiveTab = useSetRecoilState(tabState);
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
                    setActiveTab(2);
                },
            });

            setImageDataUrl(`${getVideoURLFromFilename(response.data.filePath)}`)
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
            {imageDataUrl ? <DynamicVideo src={imageDataUrl} controls /> : <CentralImage src={placeholderImage2} />}
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