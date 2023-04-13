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

const StoryboardGenerator: React.FC = () => {
    const [inputValue, setInputValue] = useState('');
    const [imageDataUrl, setImageDataUrl] = useRecoilState(lastGenerateStoryboardUrlState);
    const setActiveTab = useSetRecoilState(tabState);
    const api = useApi();

    const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(event.target.value);
    };

    const handleButtonClick = async () => {
        const processingToast = toast('Processing your storyboard. Feel free to browse, I will notify you wwhen I\'m done.', {
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
            {imageDataUrl ? <CentralVideo src={imageDataUrl} controls /> : <CentralImage src={placeholderImage2} />}
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

const CentralVideo = styled.video`
        max - width: 100 %;
        height: auto;
        margin - bottom: 10px;
        `;

const CentralImage = styled.img`
        max - width: 100 %;
        height: auto;
        margin - bottom: 10px;
        `;