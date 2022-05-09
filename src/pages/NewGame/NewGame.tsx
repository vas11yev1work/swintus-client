import './NewGame.scss';
import { FormInput } from '../../components/FormInput/FormInput';
import { useInput } from '../../hooks/useInput';
import { FormEvent, useState } from 'react';
import { toast } from 'react-hot-toast';
import { socket } from '../../helpers/socket';
import { SocketEmit } from '../../helpers/constants';

enum Screen {
  CREATE,
  JOIN,
}

export const NewGame = () => {
  const gameName = useInput('');
  const username = useInput('');

  const [screen, setScreen] = useState<Screen>(Screen.CREATE);

  function changeScreen() {
    if (screen === Screen.CREATE) {
      setScreen(Screen.JOIN);
    } else {
      setScreen(Screen.CREATE);
    }
  }

  function gameHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!gameName.value.trim()) {
      toast.error('Введите название комнаты');
      return;
    }
    if (!username.value.trim()) {
      toast.error('Введите никнейм для игры');
      return;
    }
    const gameData = {
      gameName: gameName.value,
      username: username.value,
    };
    if (screen === Screen.CREATE) {
      socket.emit(SocketEmit.CREATE_GAME, gameData);
    } else {
      socket.emit(SocketEmit.JOIN_GAME, gameData);
    }
  }

  function buttonTitle() {
    return screen === Screen.CREATE ? 'Создать игру' : 'Присоединиться к игре';
  }

  return (
    <div className="new-game">
      <div className="game-name">
        <h1 className="game-name__title_large">Свинтус</h1>
        <h1 className="game-name__title_small">Онлайн</h1>
      </div>
      <form className="game-form" onSubmit={gameHandler}>
        <FormInput
          maxlength={32}
          className="game-form__input"
          label="Название комнаты"
          {...gameName.bind}
        />
        <FormInput
          maxlength={32}
          className="game-form__input"
          label="Никнейм"
          {...username.bind}
        />
        <button
          type="submit"
          className={[
            'game-form__button',
            screen === Screen.CREATE
              ? 'game-form__button_red'
              : 'game-form__button_blue',
          ].join(' ')}
        >
          {buttonTitle()}
        </button>
      </form>
      <span className="switcher" onClick={changeScreen}>
        или подключиться к существующей игре
      </span>
    </div>
  );
};
