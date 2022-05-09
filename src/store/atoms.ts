import { atom } from 'recoil';
import {
  GameInfo,
  Message,
  ProfileData,
  PublicUserData,
} from '../helpers/types';

export const gameInfoState = atom<GameInfo | null>({
  key: 'gameInfoState',
  default: null,
});

export const profileState = atom<ProfileData | null>({
  key: 'profileState',
  default: null,
});

export const messagesState = atom<Message[]>({
  key: 'messagesState',
  default: [],
});

export const usersState = atom<PublicUserData[]>({
  key: 'usersState',
  default: [],
});
