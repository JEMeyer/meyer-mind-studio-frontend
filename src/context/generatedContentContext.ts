import { createContext } from 'react';
import { Video, Image } from '../hooks/useFetchContent';

export interface GeneratedContentContextType {
    lastGeneratedImage: Image | null;
    setLastGeneratedImage: (image: Image | null) => void;
    lastGeneratedVideo: Video | null;
    setLastGeneratedVideo: (video: Video | null) => void;
    hasPendingImageCall: boolean;
    setHasPendingImageCall: (pending: boolean) => void;
    hasPendingVideoCall: boolean;
    setHasPendingVideoCall: (pending: boolean) => void;
  }

  const GeneratedConntentContext = createContext<GeneratedContentContextType>({
    lastGeneratedImage: null,
    setLastGeneratedImage: () => {},
    lastGeneratedVideo: null,
    setLastGeneratedVideo: () => {},
    hasPendingImageCall: false,
    setHasPendingImageCall: () => {},
    hasPendingVideoCall: false,
    setHasPendingVideoCall: () => {},
  });

  export default GeneratedConntentContext;
