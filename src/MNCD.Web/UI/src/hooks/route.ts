import { useSession } from '@hooks/api/session';
import { useParams } from 'react-router-dom';
import { useDataset } from './api/dataset';

export const useRouteSession = () => {
  const { id } = useParams();
  return useSession(Number(id));
};

export const useRouteDataset = () => {
  const { id } = useParams();
  return useDataset(Number(id));
};
