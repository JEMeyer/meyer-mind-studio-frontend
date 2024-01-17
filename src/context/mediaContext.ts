import { createContext } from 'react';
import { Item } from '../hooks/useFetchContent';

export interface MediaContextType {
  item: Item | null;
  setItem: (type: Item | null) => void;
}

const MediaContext = createContext<MediaContextType>({
  item: null,
  setItem: () => {},
});

export default MediaContext;
