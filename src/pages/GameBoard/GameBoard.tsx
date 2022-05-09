import './GameBoard.scss';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { gameInfoState, messagesState, usersState } from '../../store';
import { useNavigate } from 'react-router-dom';
import { Chat } from '../../components/Chat/Chat';

export const GameBoard: React.FC = () => {
  const navigate = useNavigate();

  const [gameInfo] = useRecoilState(gameInfoState);
  const [messages] = useRecoilState(messagesState);
  const [users] = useRecoilState(usersState);

  useEffect(() => {
    if (!gameInfo) {
      navigate('/');
    }
  }, []);

  return (
    <div className="game-board">
      <div className="info-line">
        <h2 className="info-line__game-name">
          Комната: {gameInfo?.gameName || 'загрузка...'}
        </h2>
      </div>
      <div className="game-info">
        <div className="game-info__block">
          <div className="users">
            <div className="users__header">
              <h3 className="title">Игроки</h3>
              <h3 className="title">{users.length}</h3>
            </div>
            <ul className="users-list">
              {users.map(user => {
                return (
                  <li className="users-list__item" key={user.id}>
                    <div className="username">
                      <span className="username__name">{user.username}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <Chat messages={messages} />
        </div>
        <div className="game-area">Game</div>
      </div>
    </div>
  );
};
