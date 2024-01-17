import { atom, useRecoilState } from 'recoil';
import { useApi } from '../services/backend';
import { useCallback } from 'react';
import { useGetCredentials } from './useCredentials';
import { Item } from './useFetchContent';

export const sharedItemState = atom<Item | null>({
    key: 'sharedItemState',
    default: null,
  });

const useSharedContent = () => {
    const [sharedItem, setSharedContent] = useRecoilState(sharedItemState);
    const credentials = useGetCredentials();
    const api = useApi(!!credentials);

    const fetchSharedContent = useCallback(async (sharedItemId: string, sharedItemType: string) => {
      try {
        const item = (await api.get(`/${sharedItemType}/${sharedItemId}`)).data as Item;
        setSharedContent(item);
      } catch (error) {
        console.error('Error fetching 1 item: ', error);
      }
    }, [api, setSharedContent]);

    return { sharedItem, fetchSharedContent, setSharedContent };
  };

export default useSharedContent;
