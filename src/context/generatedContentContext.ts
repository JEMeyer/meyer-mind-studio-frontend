import { createContext } from 'react';

export interface GeneratedContentContextType {
    lastGeneratedImage: string | null;
    setLastGeneratedImage: (image: string | null) => void;
    lastGeneratedVideoURL: string | null;
    setLastGeneratedVideoURL: (id: string | null) => void;
    lastGeneratedVideoId: string | null;
    setLastGeneratedVideoId: (id: string | null) => void;
    lastSubmittedVideoPrompt: string | null;
    setLastSubmittedVideoPrompt: (prompt: string | null) => void;
    hasPendingImageCall: boolean;
    setHasPendingImageCall: (pending: boolean) => void;
    hasPendingVideoCall: boolean;
    setHasPendingVideoCall: (pending: boolean) => void;
  }

  const GeneratedConntentContext = createContext<GeneratedContentContextType>({
    lastGeneratedImage: null,
    setLastGeneratedImage: () => {},
    lastGeneratedVideoURL: null,
    setLastGeneratedVideoURL: () => {},
    lastGeneratedVideoId: null,
    setLastGeneratedVideoId: () => {},
    lastSubmittedVideoPrompt: null,
    setLastSubmittedVideoPrompt: () => {},
    hasPendingImageCall: false,
    setHasPendingImageCall: () => {},
    hasPendingVideoCall: false,
    setHasPendingVideoCall: () => {},
  });
  
  export default GeneratedConntentContext;