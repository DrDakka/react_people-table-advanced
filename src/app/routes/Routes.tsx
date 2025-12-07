import { RouteObject } from 'react-router-dom';
import { App } from '../App';
import { Home, PeoplePage } from '@pages/index';

export const Routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'people/:slug?',
        element: <PeoplePage />,
      },
    ],
  },
];
