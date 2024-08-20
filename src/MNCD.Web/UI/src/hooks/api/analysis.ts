import { getAnalysis } from '@lib/api/analysis';
import { Analysis } from '@lib/types/analysis';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export const useAnalysis = (
  id: number,
  options?: Partial<UseQueryOptions<Analysis>>,
) =>
  useQuery({
    queryKey: ['analysis', id],
    queryFn: () => getAnalysis(id),
    ...options,
  });
