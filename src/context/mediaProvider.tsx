import React, { useState } from 'react';
import MediaContext from './mediaContext';
import { Item } from '../hooks/useFetchContent';

interface MediaProviderProps {
  children: React.ReactNode;
}

const MediaProvider: React.FC<MediaProviderProps> = ({ children }) => {
    const [item, setItem] = useState<Item | null>(null);

    const contextValue = {
        item,
        setItem,
    };

    return (
      <MediaContext.Provider value={contextValue}>
        {children}
      </MediaContext.Provider>
    );
  };


export default MediaProvider;
