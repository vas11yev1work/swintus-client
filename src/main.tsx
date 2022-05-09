import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import { SocketInterceptorLayout } from './layouts/SocketInterceptorLayout';

import './assets/reset.scss';
import './assets/index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <RecoilRoot>
        <SocketInterceptorLayout>
          <App />
        </SocketInterceptorLayout>
      </RecoilRoot>
    </BrowserRouter>
  </React.StrictMode>
);
