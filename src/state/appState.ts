import { atom } from 'recoil';

export const tabState = atom<number>({
  key: 'tabState',
  default: 1,
});

export const lastGenerateStoryboardUrlState = atom<string>({
  key: 'lastGeneratedStoryboardUrlState',
  default: '',
})
