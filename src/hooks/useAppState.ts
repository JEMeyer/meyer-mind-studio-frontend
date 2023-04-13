import { atom, useRecoilState } from 'recoil';


const tabState = atom<number>({
  key: 'tabState',
  default: 1,
});

export const lastGenerateStoryboardUrlState = atom<string>({
  key: 'lastGeneratedStoryboardUrlState',
  default: '',
})

const useAppState = () => {
  const [tab, setTab] = useRecoilState(tabState);
  const [lastGeneratedStoryboardUrl, setLastGeneratedStoryboardUrl] = useRecoilState(lastGenerateStoryboardUrlState);

  return {
    tab,
    setTab,
    lastGeneratedStoryboardUrl,
    setLastGeneratedStoryboardUrl,
  };
};

export default useAppState;
