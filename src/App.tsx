import { useRoutes } from 'react-router-dom';
import { NewGame } from './pages/NewGame/NewGame';
import { Toaster } from 'react-hot-toast';
import { GameBoard } from './pages/GameBoard/GameBoard';

export const App = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: <NewGame />,
    },
    {
      path: '/game',
      element: <GameBoard />,
    },
  ]);

  return (
    <>
      <div className="application">{routes}</div>
      <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
    </>
  );
};
