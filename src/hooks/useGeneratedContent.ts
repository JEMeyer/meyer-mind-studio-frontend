import { useContext } from 'react';
import GeneratedContentContext, { GeneratedContentContextType } from '../context/generatedContentContext';

// lastGeneratedImage
export const useLastGeneratedIamge = (): [string | null, GeneratedContentContextType['setLastGeneratedImage']] => {
    const context = useContext(GeneratedContentContext);
    return [context.lastGeneratedImage, context.setLastGeneratedImage]
};

// lastGeneratedVideoId
export const useLastGeneratedVideoId = (): [string | null, GeneratedContentContextType['setLastGeneratedVideoId']] => {
    const context = useContext(GeneratedContentContext);
    return [context.lastGeneratedVideoId, context.setLastGeneratedVideoId]
};

// lastGeneratedVideoURL
export const useLastGeneratedVideoURL = (): [string | null, GeneratedContentContextType['setLastGeneratedVideoURL']] => {
    const context = useContext(GeneratedContentContext);
    return [context.lastGeneratedVideoURL, context.setLastGeneratedVideoURL]
};

// lastSubmittedVideoPrompt
export const useLastSubmittedVideoPrompt = (): [string | null, GeneratedContentContextType['setLastSubmittedVideoPrompt']] => {
    const context = useContext(GeneratedContentContext);
    return [context.lastSubmittedVideoPrompt, context.setLastSubmittedVideoPrompt]
};

// hasPendingImageCall
export const useHasPendingImageCall = (): [boolean, GeneratedContentContextType['setHasPendingImageCall']] => {
    const context = useContext(GeneratedContentContext);
    return [context.hasPendingImageCall, context.setHasPendingImageCall]
};

// hasPendingVideoCall
export const useHasPendingVideoCall = (): [boolean, GeneratedContentContextType['setHasPendingVideoCall']] => {
    const context = useContext(GeneratedContentContext);
    return [context.hasPendingVideoCall, context.setHasPendingVideoCall]
};
