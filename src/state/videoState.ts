import { atom, useRecoilState } from 'recoil';
import { useApi } from '../services/backend';
import { useCallback } from 'react';

export interface Video {
  id: string;
  name: string;
  public_path: string;
  prompt: string;
  total_votes: number;
  created_at: string;
}

export const videoListState = atom<Video[]>({
  key: 'videoListState',
  default: [],
});

export const useFetchVideos = () => {
    const [videos, setVideos] = useRecoilState(videoListState);
    const api = useApi();
  
    const fetchVideos = useCallback(async () => {
      try {
        const response = (await api.get('videos'));
        const data: Video[] = await response.data;
        setVideos(data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    }, [api,  setVideos]);
  
    return { videos, fetchVideos };
  };

  export  const getVideoURLFromFilename = (filename: string) =>  `${process.env.REACT_APP_MEYER_MIND_BACKEND_URL}${filename}`;