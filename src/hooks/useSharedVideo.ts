import { atom, useRecoilState } from 'recoil';
import { useApi } from '../services/backend';
import { useCallback } from 'react';
import { useGetCredentials } from './useCredentials';
import { Video } from './useFetchVideos';

export const sharedVideoState = atom<Video | null>({
    key: 'sharedVideoState',
    default: null,
  });

const useSharedVideo = () => {
    const [sharedVideo, setSharedVideo] = useRecoilState(sharedVideoState);
    const credentials = useGetCredentials();
    const api = useApi(!!credentials);

    const fetchSharedVideo = useCallback(async (sharedVideoId: string) => {
      try {
        const video = (await api.get(`/videos/${sharedVideoId}`)).data as Video;
        setSharedVideo(video);
      } catch (error) {
        console.error('Error fetching 1 video: ', error);
      }
    }, [api, setSharedVideo]);
  
    return { sharedVideo, fetchSharedVideo, setSharedVideo };
  };

export default useSharedVideo;