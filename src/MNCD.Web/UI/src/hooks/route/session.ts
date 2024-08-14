import { useSession } from '@hooks/api/session';
import { useParams } from 'react-router-dom';

export const useRouteSession = () => {
  const { id } = useParams();
  return useSession(id!);
};
