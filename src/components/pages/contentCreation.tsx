import React, { useState } from 'react';
import StoryboardGenerator from '../organisms/storyboardGenerator';
import ImageGenerator from '../organisms/imageGenerator';
import StyledButton from '../atoms/button';
import { useLastGeneratedImage } from '../../hooks/useGeneratedContent';
import FlexDiv from '../atoms/flexDiv';

const ContentCreation: React.FC = () => {
    const [optInButton, setOptInButton] = useState(false);
    const [lastGeneratedImage] = useLastGeneratedImage();

    const imageGeneratorVisible = optInButton || !!lastGeneratedImage

    return (<>
        <StoryboardGenerator />
        {!imageGeneratorVisible && <StyledButton onClick={() => setOptInButton(true)} margin='50px 10px'>Standalone Image Generator</StyledButton>}
        {imageGeneratorVisible && <><FlexDiv height='50px' /><ImageGenerator /></>}
    </>
    );
}

export default ContentCreation;
