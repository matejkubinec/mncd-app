import { createBrowserRouter } from 'react-router-dom';
import { Sessions } from '../pages/sessions/Sessions';
import { Root } from '../pages/Root';
import { SessionsAdd } from '../pages/sessions/SessionsAdd';
import { Formats } from '../pages/formats/Formats';
import { Datasets } from '../pages/datasets/Datasets';
import { AddDataset } from '../pages/datasets/AddDataset';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Sessions />,
      },
      {
        path: '/sessions/add',
        element: <SessionsAdd />,
      },
      {
        path: '/datasets',
        element: <Datasets />,
      },
      {
        path: '/datasets/add',
        element: <AddDataset />,
      },
      {
        path: '/formats',
        element: <Formats />,
      },
    ],
  },
]);
