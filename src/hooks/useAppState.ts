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
const lastGenerateStoryboardUrlState = atom<string>({
  key: 'lastGeneratedStoryboardUrlState',
  default: '',
})

export const useLastGeneratedStoryboardUrlState = () => {
  const [lastGeneratedStoryboardUrl, setLastGeneratedStoryboardUrl] = useRecoilState(lastGenerateStoryboardUrlState);
  return { lastGeneratedStoryboardUrl, setLastGeneratedStoryboardUrl };
};

// lastSubmittedStoryboardPromptState
const lastSubmittedStoryboardPromptState = atom<string>({
  key: 'lastSubmittedStoryboardPromptState',
  default: '',
})

export const useLastSubmittedStoryboardPromptState = () => {
  const [lastSubmittedStoryboardPrompt, setLastSubmittedStoryboardPrompt] = useRecoilState(lastSubmittedStoryboardPromptState);
  return { lastSubmittedStoryboardPrompt, setLastSubmittedStoryboardPrompt };
};

// lastGeneratedVideoIdState
const lastGeneratedVideoIdState = atom<string>({
  key: 'lastGeneratedVideoIdState',
  default: '',
})

export const useLastGeneratedVideoIdState = () => {
  const [lastGeneratedVideoId, setLastGeneratedVideoId] = useRecoilState(lastGeneratedVideoIdState);
  return { lastGeneratedVideoId, setLastGeneratedVideoId };
};


// Video request params
interface VideosRequestParams {
  sorting: string,
  timeframe: string,
  page: number,
}

const videosRequestState = atom<VideosRequestParams>({
  key: 'videosRequestState',
  default: {sorting: 'top', timeframe: 'week', page: 1}
})

export const useVideosRequestState = () => {
  const [videosRequestParams, setVideosRequestParams] = useRecoilState(videosRequestState)
  return { videosRequestParams, setVideosRequestParams }
}

// last generated image
const lastGeneratedImageState = atom<string>({
  key: 'lastGeneratedImageState',
  default: ''
});

export const useLastGeneratedImageState = () => {
  const [lastGeneratedImage, setLastGeneratedImage] = useRecoilState(lastGeneratedImageState);
  return {lastGeneratedImage, setLastGeneratedImage};
}

// shared video id
// const sharedVideoIdState = atom<string>({
//   key: 'sharedVideoIdState',
//   default: ''
// });

// export const useSharedVideoIdState = () => {
//   const [sharedVideoId, setSharedVideoId] = useRecoilState(sharedVideoIdState);
//   return {sharedVideoId, setSharedVideoId};
// }