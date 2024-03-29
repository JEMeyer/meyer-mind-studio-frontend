import React from 'react';
import FlexDiv from '../atoms/flexDiv';
import StyledHeading from '../atoms/heading';
import styled from 'styled-components';

const About: React.FC = () => {


    return (
        <AboutWrapper flexDirection='column' alignItems='flex-start' width='800px'>
            <StyledHeading text='Project Inception' />
            <p>I had 2 weeks off from work and wanted a pet project before heading back. With GPT and Generative AI in the news, I decided to chain multiple Al products together to build something really cool. I set my end goal to be: prompt-to-storyboard (aka fun videos generated purely via generative AI).</p>
            <p>There exists some prompt-to-video products, but I wanted to tell stories with audio as well. The end product takes an initial prompt and produces a series of images and audio files, which I then combine (with subtitles) into the final video. To showcase videos, there is a basic upvote/downvote leaderboard.</p>
            <br />
            <a href="https://stability.ai/" target="_blank" rel="noopener noreferrer"><StyledHeading text='Images | Stability AI' level='h3' /></a>
            <p>While I originally setup the storyboard generator to use DALL-E due to already integrating with OpenAl for GPI, I found the cost prohibitive. As such, the images generated for the storyboards are from Stability Al's Stable Diffusion (SDXL 1.0). I combine the description of the frame that GPT provides, in addition to the theme and setting that GPT output for the whole storyboard, to generate each frame. Since GPT controls the data sent to Stable Diffusion with the description of the frame as well as the theme and setting, if your prompt dictates a theme it should hopefully translate into a theme in your storyboard.</p>
            <p>Both the storyboard and the 'prompt enhanced' image generation in the 'Create Content' tab pre-feed a GPT request with a summary of Stability Al's prompt guide. It will try and pick keyword weights to improve the image, and much like the setting and theme, keywords should be influenced by the initial prompt provided to the product. Images are generated locally so creation may take over a minute.</p>
            <br />
            <a href="https://openai.com/" target="_blank" rel="noopener noreferrer"><StyledHeading text='Text | OpenAI' level='h3' /></a>
            <p>Text is generated in a few high-level steps that I ask GPT to work through. These are all based on the initial user prompt, as such (ideally) indirectly controlled by the user.</p>
            <ol>
                <li>Create a concept for a movie scene based on the prompt, including the theme and setting</li>
                <li>Define each character in the scene
                    <ul>
                        <li>Define how each character looks</li>
                    </ul>
                </li>
                <li>Define 'frames' of the storyboard</li>
            </ol>
            <p>All of this textual information is defined in a JSON object I describe to GPT. I then take GPT's output and build the storyboard with the tools below.</p>
            <br />
            <a href="https://azure.microsoft.com/en-us/products/ai-services/" target="_blank" rel="noopener noreferrer"><StyledHeading text='Voices | Microsoft' level='h3' /></a>
            <p>From the GPT output, I select a random male and female voice per characer and used the Azure Cognitive API to generate the voices.</p>
            <StyledHeading text="Conclusion" level='h3' />
            <p>Have fun and make my 2 weeks of work seem worth it!</p>
            <p>Contact me:<a href="mailto:storyboard@meyer.id">storyboard@meyer.id</a></p>
        </AboutWrapper>);
}

export default About;

const AboutWrapper = styled(FlexDiv)`
@media screen and (max-width: 900px) {
    width: 100%;
}
`;
