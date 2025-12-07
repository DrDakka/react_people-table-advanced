import { HashRouter } from 'react-router-dom';
import { useRoutes } from 'react-router-dom';
import { Routes } from './app/routes';

const AppRoutes = () => useRoutes(Routes);

export const Root = () => (
  <HashRouter>
    <AppRoutes />
  </HashRouter>
);
