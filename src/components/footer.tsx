import React from 'react';
import styled from 'styled-components';

const Footer: React.FC = () => {
  const tools = [
    { name: 'Azure AI', url: 'https://azure.microsoft.com/en-us/products/ai-services/' },
    { name: 'GPT', url: 'https://openai.com/' },
    { name: 'Stability AI', url: 'https://stability.ai/' },
    // Add more tools here
  ];

  return (
    <FooterContainer>
      <p>Tools used:</p>
      <ToolsList>
        {tools.map((tool, index) => (
          <li key={index}>
            <a href={tool.url} target="_blank" rel="noopener noreferrer">
              {tool.name}
            </a>
          </li>
        ))}
      </ToolsList>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.footer`
  background-color: #333;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin: 0 -8px;
`;

const ToolsList = styled.ul`
  display: flex;
  justify-content: center;
  list-style-type: none;
  padding: 0;

  li {
    margin: 0 10px;
  }

  a {
    color: #4579db;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;
