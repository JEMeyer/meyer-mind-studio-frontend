// src/ExampleComponent.tsx
import React, { useState } from 'react';
import { useApi } from '../services/backend';
import styled from 'styled-components';

const ImageGenerator: React.FC = () => {
    const [inputValue, setInputValue] = useState('');
    const [imageDataUrl, setImageDataUrl] = useState("");
    const api = useApi();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleButtonClick = async () => {
        try {
            const response = await api.post('/promptToImage', { prompt: inputValue }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                responseType: 'arraybuffer',
            });
            console.log('API response:', response.data);

            const blob = new Blob([response.data], { type: 'image/png' });
            const reader = new FileReader();
            reader.onload = (event) => {
                setImageDataUrl(event.target?.result as string);
            };
            reader.readAsDataURL(blob);
        } catch (error) {
            console.error('Failed to call API:', error);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
            />
            <button onClick={handleButtonClick}>Submit</button>
            {imageDataUrl && <img src={imageDataUrl} alt="Generated image" />}
        </div>
    );
};

export default ImageGenerator;
const CentralImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CentralImage = styled.img`
  width: 512px;
  height: 512px;
  object-fit: cover;
`;

const TextBox = styled.div`
  margin-top: 20px;
  text-align: center;
  width: 512px;
`;