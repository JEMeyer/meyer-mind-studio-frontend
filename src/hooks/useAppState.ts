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

// lastGenerateStoryboardUrlState
export const lastGenerateStoryboardUrlState = atom<string>({
  key: 'lastGeneratedStoryboardUrlState',
  default: '',
})

export const useLastGeneratedStoryboardUrlState = () => {
  const [lastGeneratedStoryboardUrl, setLastGeneratedStoryboardUrl] = useRecoilState(lastGenerateStoryboardUrlState);
  return { lastGeneratedStoryboardUrl, setLastGeneratedStoryboardUrl };
};

// lastSubmittedStoryboardPromptState
export const lastSubmittedStoryboardPromptState = atom<string>({
  key: 'lastSubmittedStoryboardPromptState',
  default: '',
})

export const useLastSubmittedStoryboardPromptState = () => {
  const [lastSubmittedStoryboardPrompt, setLastSubmittedStoryboardPrompt] = useRecoilState(lastSubmittedStoryboardPromptState);
  return { lastSubmittedStoryboardPrompt, setLastSubmittedStoryboardPrompt };
};

interface VideosRequestParams {
  sorting: string,
  timeframe: string,
  page: number,
}

export const videosRequestState = atom<VideosRequestParams>({
  key: 'videosRequestState',
  default: {sorting: 'top', timeframe: 'week', page: 1}
})

export const useVideosRequestState = () => {
  const [videosRequestParams, setVideosRequesetParams] = useRecoilState(videosRequestState)
  return { videosRequestParams, setVideosRequesetParams }
}
