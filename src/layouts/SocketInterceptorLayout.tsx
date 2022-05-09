import React, { useEffect } from 'react';
import { socket } from '../helpers/socket';
import { SocketOn } from '../helpers/constants';
import { toast } from 'react-hot-toast';
import {
  ErrorMessage,
  GameInfo,
  Message,
  ProfileData,
  PublicUserData,
} from '../helpers/types';
import { useRecoilState } from 'recoil';
import {
  gameInfoState,
  messagesState,
  profileState,
  usersState,
} from '../store';
import { useNavigate } from 'react-router-dom';

export const SocketInterceptorLayout: React.FC<{
  children: JSX.Element;
}> = props => {
  const navigate = useNavigate();
  const [gameInfo, setGameInfo] = useRecoilState(gameInfoState);
  const [profileInfo, setProfileInfo] = useRecoilState(profileState);
  const [messages, setMessages] = useRecoilState(messagesState);
  const [users, setUsers] = useRecoilState(usersState);

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
        navigate('/game');
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
        setMessages(lastMessages => {
          return [
            ...lastMessages,
            {
              username: 'ADMIN',
              isAdmin: true,
              message: `Пользователь ${user.username} присоединился к игре`,
            },
          ];
        });
      },
    },
    {
      name: SocketOn.NEW_MESSAGE,
      handler: (message: Message) => {
        setMessages(lastMessages => {
          return [...lastMessages, message];
        });
      },
    },
    {
      name: SocketOn.USERS_LIST,
      handler: (users: PublicUserData[]) => {
        setUsers(users);
      },
    },
  ];

  useEffect(() => {
    console.log('socket interceptor');
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
