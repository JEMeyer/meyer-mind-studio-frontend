import React from 'react';
import ImageGenerator from '../molecules/imageGenerator';
import StyledHeading from '../atoms/heading';

const ImageGeneration: React.FC = () => {
    return (<>
        <StyledHeading text='Image Generator' />
        <StyledHeading level='h3' text='Provide a prompt. Stable Diffusion will draw an image based on your prompt.' />
        <ImageGenerator />
    </>
    );
}

export default ImageGeneration;
