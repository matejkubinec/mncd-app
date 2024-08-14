import { AddDatasetPage } from '@pages/datasets-add';
import { DatasetsPage } from '@pages/datasets';
import { FormatsPage } from '@pages/formats';
import { AddSessionPage } from '@pages/sessions-add';
import { EditSessionPage } from '@pages/sessions-edit';
import { SessionsPage } from '@pages/sessions/Sessions';
import { Root } from '@components/root';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <SessionsPage />,
      },
      {
        path: '/sessions/add',
        element: <AddSessionPage />,
      },
      {
        path: '/sessions/:id/edit',
        element: <EditSessionPage />,
      },
      {
        path: '/datasets',
        element: <DatasetsPage />,
      },
      {
        path: '/datasets/add',
        element: <AddDatasetPage />,
      },
      {
        path: '/formats',
        element: <FormatsPage />,
      },
    ],
  },
]);
