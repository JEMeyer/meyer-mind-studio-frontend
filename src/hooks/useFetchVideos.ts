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

const videoListState = atom<Video[]>({
  key: 'videoListState',
  default: [],
});

const useFetchVideos = () => {
    const [videos, setVideos] = useRecoilState(videoListState);
    const credentials = useGetCredentials();
    const api = useApi(!!credentials);
  
    const fetchVideos = useCallback(async (sorting: string, timeframe: string, page: number, onlyUserVideos: boolean) => {
      try {
        const response = (await api.get(`/videos?sorting=${sorting}&timeframe=${timeframe}&page=${page}&userContentOnly=${onlyUserVideos}`));
        const data: Video[] = response.data;
        return data;
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    }, [api]);

    const fetchVideosAndSetState = useCallback(async (sorting: string, timeframe: string, page: number, onlyUserVideos: boolean) => {
      try {
        const response = (await api.get(`/videos?sorting=${sorting}&timeframe=${timeframe}&page=${page}&userContentOnly=${onlyUserVideos}`));
        const data: Video[] = await response.data;
        setVideos(data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    }, [api, setVideos]);

    const fetchVideo = useCallback(async (videoId: string) => {
      try {
        const video = await api.get(`/videos/${videoId}`);
        return video;
      } catch (error) {
        console.error('Error fetching 1 video: ', error);
      }
    }, [api]);
  
    return { videos, setVideos, fetchVideos, fetchVideosAndSetState, fetchVideo };
  };

export default useFetchVideos;