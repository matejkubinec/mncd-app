import { useSession } from '@hooks/api/session';
import { useParams } from 'react-router-dom';
import { useDataset } from './api/dataset';
import { useAnalysis } from './api/analysis';

export const useRouteSession = (paramName = 'id') => {
  const params = useParams();
  return useSession(Number(params[paramName]));
};

export const useRouteDataset = (paramName = 'id') => {
  const params = useParams();
  return useDataset(Number(params[paramName]));
};

export const useRouteAnalysis = (paramName = 'id') => {
  const params = useParams();
  return useAnalysis(Number(params[paramName]));
};
