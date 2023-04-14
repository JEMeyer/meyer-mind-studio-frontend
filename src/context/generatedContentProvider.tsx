import React, { useState } from 'react';
import GeneratedContentContext from './generatedContentContext';

interface GeneratedContentProviderProps {
  children: React.ReactNode;
}

const GeneratedContentProvider: React.FC<GeneratedContentProviderProps> = ({ children }) => {
    const [lastGeneratedImage, setLastGeneratedImage] = useState<string | null>(null);
    const [lastGeneratedVideoURL, setLastGeneratedVideoURL] = useState<string | null>(null);
    const [lastGeneratedVideoId, setLastGeneratedVideoId] = useState<string | null>(null);
    const [lastSubmittedVideoPrompt, setLastSubmittedVideoPrompt] = useState<string | null>(null);
    const [hasPendingImageCall, setHasPendingImageCall] = useState<boolean>(false);
    const [hasPendingVideoCall, setHasPendingVideoCall] = useState<boolean>(false);
  
    const contextValue = {
      lastGeneratedImage,
      lastGeneratedVideoURL,
      lastGeneratedVideoId,
      lastSubmittedVideoPrompt,
      hasPendingImageCall,
      hasPendingVideoCall,
      setLastGeneratedImage,
      setLastGeneratedVideoURL,
      setLastGeneratedVideoId,
      setLastSubmittedVideoPrompt,
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
