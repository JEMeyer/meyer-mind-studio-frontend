import React from 'react';
import StoryboardGenerator from '../molecules/storyboardGenerator';
import StyledHeading from '../atoms/heading';

const StoryboardGeneration: React.FC = () => {
    return (<>
        <StyledHeading text='Storyboard Generator' />
        <StyledHeading level='h3' text='Provide a prompt. Based on this prompt, a video will be generated purely with AI tools including: GPT, Stable Diffusion, and Coqui.' />
        <StoryboardGenerator />
    </>
    );
}

export default StoryboardGeneration;
