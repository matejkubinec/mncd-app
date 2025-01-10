import {
  addDataset,
  deleteDataset,
  getDataset,
  getDatasets,
  patchDataset,
} from '@lib/api/dataset';
import {
  Dataset,
  DatasetListItem,
  PatchDatasetPayload,
} from '@lib/types/dataset';
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

export const useUpdateDataset = (
  options?: Partial<UseMutationOptions<Dataset, Error, PatchDatasetPayload>>,
) =>
  useMutation({
    mutationFn: patchDataset,
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
