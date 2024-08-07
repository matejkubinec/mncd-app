import { useQuery } from '@tanstack/react-query';
import { getDatasets } from '../../api/dataset';

export const useDatasets = () =>
  useQuery({
    queryKey: ['dataset'],
    queryFn: getDatasets,
  });
