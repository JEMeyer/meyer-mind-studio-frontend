import React, { useState } from 'react';
import StoryboardGenerator from '../organisms/storyboardGenerator';
import ImageGenerator from '../organisms/imageGenerator';
import StyledButton from '../atoms/button';
import { useLastGeneratedIamge } from '../../hooks/useGeneratedContent';

const ContentCreation: React.FC = () => {
    const [optInButton, setOptInButton] = useState(false);
    const [lastGeneratedImage] = useLastGeneratedIamge();

    const imageGeneratorVisible = optInButton || !!lastGeneratedImage
    
    return (<>
        <StoryboardGenerator />
        {!imageGeneratorVisible && <StyledButton onClick={() => setOptInButton(true)} margin='50px 10px'>Standalone Image Generator</StyledButton>}
        {imageGeneratorVisible && <ImageGenerator />}
    </>
    );
}

export default ContentCreation;
