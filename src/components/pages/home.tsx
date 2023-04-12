import React from 'react';
import StyledHeading from '../atoms/heading';
import styled from 'styled-components';

const Home: React.FC = () => {
    return (
        <>
            <StyledHeading text='Login to create content.' />
            <StyledHeading level='h3' text='Once you login, use the menu  to navigate to "Storyboard" or "Image".' />
            <CentralImage src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fimages5.fanpop.com%2Fimage%2Fphotos%2F29000000%2FFunny-Animals-animal-humor-29016374-1600-1200.jpg&f=1&nofb=1&ipt=d879ae0d032ef906878f5ab7352949e1402d1e041461b7a80017afd4e947d675&ipo=images" />
        </>);
}

export default Home;

const CentralImage = styled.img`
max-width: 100%;
height: auto;
margin-bottom: 10px;
`;