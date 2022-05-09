import './Chat.scss';
import React, { FormEvent, useEffect, useRef } from 'react';
import { Message } from '../../helpers/types';
import { useInput } from '../../hooks/useInput';
import { socket } from '../../helpers/socket';
import { SocketEmit } from '../../helpers/constants';

interface Props {
  messages: Message[];
}

export const Chat: React.FC<Props> = props => {
  const message = useInput('');

  const endRef = useRef<HTMLDivElement | null>(null);

  function sendMessage(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (message.value.trim()) {
      socket.emit(SocketEmit.SEND_MESSAGE, { message: message.value });
      message.change('');
    }
  }

  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [props.messages]);

  return (
    <div className="chat">
      <h3 className="chat__title">Чат игры</h3>
      <div className="messages-wrap">
        {props.messages.map((message, index) => {
          return (
            <div className="message" key={index}>
              <span className="message__text">
                <i
                  className={[
                    'message__identifier',
                    message.isAdmin
                      ? 'message__identifier_red'
                      : 'message__identifier_blue',
                  ].join(' ')}
                >
                  {message.username}:{' '}
                </i>
                {message.message}
              </span>
            </div>
          );
        })}
        <div className="end" ref={endRef} />
      </div>
      <form onSubmit={sendMessage} className="message-form">
        <input
          className="message-form__input"
          type="text"
          placeholder="Введите сообщение"
          {...message.bind}
        />
      </form>
    </div>
  );
};
