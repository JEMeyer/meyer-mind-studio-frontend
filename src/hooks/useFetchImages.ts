import { atom, useRecoilState } from 'recoil';
import { useApi } from '../services/backend';
import { useCallback } from 'react';
import { useGetCredentials } from './useCredentials';

export interface Image {
  id: string;
  public_path: string;
  prompt: string;
  total_votes: number | null;
  created_at: string;
  user_vote: number | null;
}

export interface ImagesRequestParams {
    sorting: string,
    timeframe: string,
    userContentOnly: boolean,
    likedItems: boolean,
  }

const imageListState = atom<Image[]>({
  key: 'imageListState',
  default: [],
});

const useFetchImages = () => {
    const [images, setImages] = useRecoilState(imageListState);
    const credentials = useGetCredentials();
    const api = useApi(!!credentials);

    const fetchImages = useCallback(async (sorting: string, timeframe: string, page: number, onlyUserImages: boolean, likedImages: boolean) => {
      try {
        const response = (await api.get(`/pictures?sorting=${sorting}&timeframe=${timeframe}&page=${page}&userContentOnly=${onlyUserImages}&likedItems=${likedImages}`));
        const data: Image[] = response.data;
        return data;
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    }, [api]);

    const fetchImagesAndSetState = useCallback(async (sorting: string, timeframe: string, page: number, onlyUserImages: boolean, likedImages: boolean) => {
      try {
        const response = (await api.get(`/pictures?sorting=${sorting}&timeframe=${timeframe}&page=${page}&userContentOnly=${onlyUserImages}&likedItems=${likedImages}`));
        const data: Image[] = await response.data;
        setImages(data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    }, [api, setImages]);

    const fetchImage = useCallback(async (imageId: string) => {
      try {
        const image = await api.get(`/pictures/${imageId}`);
        return image;
      } catch (error) {
        console.error('Error fetching 1 video: ', error);
      }
    }, [api]);

    return { images, setImages, fetchImages, fetchImagesAndSetState, fetchImage };
  };

export default useFetchImages;
