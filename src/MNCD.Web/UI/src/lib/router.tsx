import { AddDatasetPage } from '@pages/datasets-add';
import { DatasetsPage } from '@pages/datasets';
import { FormatsPage } from '@pages/formats';
import { AddSessionPage } from '@pages/sessions-add';
import { EditSessionPage } from '@pages/sessions-edit';
import { SessionsPage } from '@pages/sessions/Sessions';
import { Root } from '@components/root';
import { createBrowserRouter } from 'react-router-dom';
import { EditDatasetPage } from '@pages/datasets-edit';
import { DatasetDetail } from '@pages/datasets-detail';
import { SessionPage } from '@pages/session';
import { SessionAnalysis } from '@pages/session-analysis';
import { AnalysisPage } from '@pages/analysis';

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
        path: '/sessions/:id',
        element: <SessionPage />,
      },
      {
        path: '/session/:sessionId/analysis/:analysisId',
        element: <AnalysisPage />,
      },
      {
        path: '/sessions/:id/analyze',
        element: <SessionAnalysis />,
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
        path: '/datasets/:id/edit',
        element: <EditDatasetPage />,
      },
      {
        path: '/datasets/add',
        element: <AddDatasetPage />,
      },
      {
        path: '/datasets/:id',
        element: <DatasetDetail />,
      },
      {
        path: '/formats',
        element: <FormatsPage />,
      },
    ],
  },
]);
