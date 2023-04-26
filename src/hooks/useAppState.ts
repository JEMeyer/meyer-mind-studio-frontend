import { atom, useRecoilState } from 'recoil';

// tabState
const tabState = atom<number>({
  key: 'tabState',
  default: 1,
});

export const useTabState = () => {
  const [tab, setTab] = useRecoilState(tabState);
  return { tab, setTab };
};