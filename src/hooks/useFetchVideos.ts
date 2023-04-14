import { atom, useRecoilState } from 'recoil';
import { useApi } from '../services/backend';
import { useCallback } from 'react';
import { useGetCredentials } from './useCredentials';

export interface Video {
  id: string;
  name: string;
  public_path: string;
  prompt: string;
  total_votes: number;
  created_at: string;
  user_vote: number | null;
}

export const videoListState = atom<Video[]>({
  key: 'videoListState',
  default: [],
});

const useFetchVideos = () => {
    const [videos, setVideos] = useRecoilState(videoListState);
    const credentials = useGetCredentials();
    const api = useApi(!!credentials);
  
    const fetchVideos = useCallback(async (sorting: string, timeframe: string, page: number) => {
      try {
        const response = (await api.get(`/videos?sorting=${sorting}&timeframe=${timeframe}&page=${page}`));
        const data: Video[] = await response.data;
        return data;
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    }, [api]);

    const fetchVideosAndSetState = useCallback(async (sorting: string, timeframe: string, page: number) => {
      try {
        const response = (await api.get(`/videos?sorting=${sorting}&timeframe=${timeframe}&page=${page}`));
        const data: Video[] = await response.data;
        setVideos(data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    }, [api, setVideos]);
  
    return { videos, setVideos, fetchVideos, fetchVideosAndSetState };
  };

export default useFetchVideos;