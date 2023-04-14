import React, { useState } from 'react';
import StoryboardGenerator from '../generators/storyboardGenerator';
import ImageGenerator from '../generators/imageGenerator';
import StyledButton from '../atoms/button';
import { useLastGeneratedImageState } from '../../hooks/useAppState';

const ContentCreation: React.FC = () => {
    const [optInButton, setOptInButton] = useState(false);
    const {lastGeneratedImage} = useLastGeneratedImageState();

    const imageGeneratorVisible = optInButton || !!lastGeneratedImage
    
    return (<>
        <StoryboardGenerator />
        {!imageGeneratorVisible && <StyledButton onClick={() => setOptInButton(true)} margin='100px 10px'>Show Image Generator</StyledButton>}
        {imageGeneratorVisible && <ImageGenerator />}
    </>
    );
}

export default ContentCreation;
