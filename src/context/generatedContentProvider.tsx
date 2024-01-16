import React, { useState } from 'react';
import GeneratedContentContext from './generatedContentContext';
import { Video, Image } from '../hooks/useFetchContent';

interface GeneratedContentProviderProps {
  children: React.ReactNode;
}

const GeneratedContentProvider: React.FC<GeneratedContentProviderProps> = ({ children }) => {
    const [lastGeneratedImage, setLastGeneratedImage] = useState<Image | null>(null);
    const [lastGeneratedVideo, setLastGeneratedVideo] = useState<Video | null>(null);
    const [hasPendingImageCall, setHasPendingImageCall] = useState<boolean>(false);
    const [hasPendingVideoCall, setHasPendingVideoCall] = useState<boolean>(false);

    const contextValue = {
      lastGeneratedImage,
      lastGeneratedVideo,
      hasPendingImageCall,
      hasPendingVideoCall,
      setLastGeneratedImage,
      setLastGeneratedVideo,
      setHasPendingImageCall,
      setHasPendingVideoCall,
    };

    return (
      <GeneratedContentContext.Provider value={contextValue}>
        {children}
      </GeneratedContentContext.Provider>
    );
  };


export default GeneratedContentProvider;
