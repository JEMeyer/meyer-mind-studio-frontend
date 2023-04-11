import { atom } from 'recoil';

export const credentialsState = atom<string | null>({
  key: 'credentialsState',
  default: null,
});
