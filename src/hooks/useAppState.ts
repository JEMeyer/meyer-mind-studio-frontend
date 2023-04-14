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