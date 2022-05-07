import { useRoutes } from 'react-router-dom';
import { NewGame } from './pages/NewGame';
import { Toaster } from 'react-hot-toast';

export const App = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: <NewGame />,
    },
  ]);

  return (
    <>
      <div className="application">{routes}</div>
      <Toaster position="top-right" toastOptions={{ duration: 5000 }} />
    </>
  );
};
