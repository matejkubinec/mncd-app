import {
  addDataset,
  deleteDataset,
  getDataset,
  getDatasets,
} from '@lib/api/dataset';
import { Dataset, DatasetListItem } from '@lib/types/dataset';
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';

export const useDatasets = (
  options?: Partial<UseQueryOptions<DatasetListItem[]>>,
) =>
  useQuery({
    queryKey: ['dataset'],
    queryFn: getDatasets,
    ...options,
  });

export const useDataset = (
  id: number,
  options?: Partial<UseQueryOptions<Dataset>>,
) =>
  useQuery({
    queryKey: ['dataset', id],
    queryFn: () => getDataset(id),
    ...options,
  });

export const useAddDataset = (
  options?: Partial<UseMutationOptions<Dataset, Error, FormData>>,
) =>
  useMutation({
    mutationFn: addDataset,
    ...options,
  });

export const useDeleteDataset = (
  options?: Partial<UseMutationOptions<object, Error, number>>,
) =>
  useMutation({
    mutationFn: deleteDataset,
    ...options,
  });

export const useDownloadDataset = (id?: number) => {
  const download = () => window.open(`/api/dataset/download/${id}`);
  return { download };
};
