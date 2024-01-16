import { useContext } from 'react';
import GeneratedContentContext, { GeneratedContentContextType } from '../context/generatedContentContext';
import { Video, Image } from './useFetchContent';

// lastGeneratedImage
export const useLastGeneratedIamge = (): [Image | null, GeneratedContentContextType['setLastGeneratedImage']] => {
    const context = useContext(GeneratedContentContext);
    return [context.lastGeneratedImage, context.setLastGeneratedImage]
};

// lastGeneratedVideo
export const useLastGeneratedVideo = (): [Video | null, GeneratedContentContextType['setLastGeneratedVideo']] => {
    const context = useContext(GeneratedContentContext);
    return [context.lastGeneratedVideo, context.setLastGeneratedVideo]
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
