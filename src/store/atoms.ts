import { atom } from 'recoil';
import { GameInfo, ProfileData } from '../helpers/types';

export const gameInfoState = atom<GameInfo | null>({
  key: 'gameInfoState',
  default: null,
});

export const profileState = atom<ProfileData | null>({
  key: 'profileState',
  default: null,
});
