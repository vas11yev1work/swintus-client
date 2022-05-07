import React, { useEffect } from 'react';
import { socket } from '../helpers/socket';
import { SocketOn } from '../helpers/constants';
import { toast } from 'react-hot-toast';
import {
  ErrorMessage,
  GameInfo,
  ProfileData,
  PublicUserData,
} from '../helpers/types';
import { useRecoilState } from 'recoil';
import { gameInfoState, profileState } from '../store';

export const SocketInterceptorLayout: React.FC<{
  children: JSX.Element;
}> = props => {
  const [gameInfo, setGameInfo] = useRecoilState(gameInfoState);
  const [profileInfo, setProfileInfo] = useRecoilState(profileState);

  const listeners = [
    {
      name: SocketOn.SERVER_ERROR,
      handler: (e: ErrorMessage) => {
        // eslint-disable-next-line no-console
        console.error(e);
        toast.error(e.message);
      },
    },
    {
      name: SocketOn.GAME_ERROR,
      handler: (e: ErrorMessage) => {
        // eslint-disable-next-line no-console
        console.error(e);
        toast.error(e.message);
      },
    },
    {
      name: SocketOn.GAME_INFO,
      handler: (game: GameInfo) => {
        setGameInfo(game);
      },
    },
    {
      name: SocketOn.WHO_AM_I,
      handler: (profile: ProfileData) => {
        setProfileInfo(profile);
      },
    },
    {
      name: SocketOn.USER_JOINED,
      handler: (user: PublicUserData) => {
        toast.success(`Присоединился пользователь ${user.username}!`);
      },
    },
  ];

  useEffect(() => {
    /* При использовании React.StrictMode происходит двойной
     * вызов useEffect. Эта конструкция нужна для того, чтобы
     * не подписываться на события несколько раз. Работает
     * только в режиме разработки */
    if (import.meta.env.MODE === 'development') {
      listeners.forEach(listener => {
        socket.off(listener.name);
      });
    }

    listeners.forEach(listener => {
      socket.on(listener.name, listener.handler);
    });

    return () => {
      listeners.forEach(listener => {
        socket.off(listener.name);
      });
    };
  }, []);

  return props.children;
};
