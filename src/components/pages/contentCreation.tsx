import React, { useState } from 'react';
import StoryboardGenerator from '../generators/storyboardGenerator';
import ImageGenerator from '../generators/imageGenerator';
import StyledButton from '../atoms/button';

const ContentCreation: React.FC = () => {
    const [showImageGen, setShowImageGen] = useState(false);
    
    return (<>
        <StoryboardGenerator />
        {!showImageGen && <StyledButton onClick={() => setShowImageGen(true)} margin='100px 10px'>Show Image Generator</StyledButton>}
        {showImageGen && <ImageGenerator />}
    </>
    );
}

export default ContentCreation;
