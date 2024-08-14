import { getDatasets } from '@lib/api/dataset';
import { useQuery } from '@tanstack/react-query';

export const useDatasets = () =>
  useQuery({
    queryKey: ['dataset'],
    queryFn: getDatasets,
  });
