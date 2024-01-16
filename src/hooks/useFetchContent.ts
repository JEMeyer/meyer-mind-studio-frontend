import { atom, useRecoilState } from 'recoil';
import { useApi } from '../services/backend';
import { useCallback } from 'react';
import { useGetCredentials } from './useCredentials';

export type Item = Video | Image;

export enum ContentType {
  VIDEO = 1,
  PICTURE = 2
}

export interface Image {
  id: string;
  public_path: string;
  prompt: string;
  total_votes: number | null;
  created_at: string;
  user_vote: number | null;
}

export interface Video {
    id: string;
    name: string;
    public_path: string;
    prompt: string;
    total_votes: number | null;
    created_at: string;
    user_vote: number | null;
  }

export function isVideo(item: Item): item is Video {
  return (item as Video).name !== undefined;
}

export function stringToContentType(input: string) {
  switch (input) {
    case 'all':
      return null;
    case 'videos':
      return ContentType.VIDEO;
    case 'images':
      return ContentType.PICTURE;
  }
}

export function contentTypeToString(input: ContentType | null) {
  switch (input) {
    case ContentType.PICTURE:
      return 'images';
    case ContentType.VIDEO:
      return 'videos';
    case null:
      return 'all';
  }
}

export interface ItemsReqeustParams {
  sorting: string,
  timeframe: string,
  userContentOnly: boolean,
  likedItems: boolean,
  contentType: ContentType | null
}

const contentListState = atom<Item[]>({
  key: 'contentListState',
  default: [],
});

const useFetchContent = () => {
    const [content, setContent] = useRecoilState(contentListState);
    const credentials = useGetCredentials();
    const api = useApi(!!credentials);

    const fetchContent = useCallback(async (sorting: string, timeframe: string, page: number, onlyUserContent: boolean, likedIteme: boolean, contentType: ContentType | null) => {
      try {
        const response = (await api.get(`/content?sorting=${sorting}&timeframe=${timeframe}&page=${page}&userContentOnly=${onlyUserContent}&likedItems=${likedIteme}&contentType=${contentType}`));
        const data: Item[] = response.data;
        return data;
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    }, [api]);

    const fetchContentAndSetState = useCallback(async (sorting: string, timeframe: string, page: number, onlyUserContent: boolean, likedIteme: boolean, contentType: ContentType | null) => {
      try {
        const response = (await api.get(`/content?sorting=${sorting}&timeframe=${timeframe}&page=${page}&userContentOnly=${onlyUserContent}&likedItems=${likedIteme}&contentType=${contentType}`));
        const data: Item[] = await response.data;
        setContent(data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    }, [api, setContent]);

    return { content, setContent, fetchContent, fetchContentAndSetState };
  };

export default useFetchContent;
