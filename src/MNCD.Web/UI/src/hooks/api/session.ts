import {
  addSession,
  deleteSession,
  getSession,
  getSessions,
  patchSession,
} from '@lib/api/session';
import {
  AddSessionPayload,
  PatchSessionPayload,
  Session,
} from '@lib/types/session';
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';

export const useSessions = (options?: Partial<UseQueryOptions<Session[]>>) =>
  useQuery({
    queryKey: ['sessions'],
    queryFn: getSessions,
    ...options,
  });

export const useAddSession = (
  options?: Partial<UseMutationOptions<Session, Error, AddSessionPayload>>,
) =>
  useMutation({
    mutationFn: addSession,
    ...options,
  });

export const useUpdateSession = (
  options?: Partial<UseMutationOptions<Session, Error, PatchSessionPayload>>,
) =>
  useMutation({
    mutationFn: patchSession,
    ...options,
  });

export const useSession = (
  id: number,
  options?: Partial<UseQueryOptions<Session>>,
) =>
  useQuery({
    queryKey: ['session', id],
    queryFn: () => getSession(id),
    ...options,
  });

export const useDeleteSession = (
  options?: Partial<UseMutationOptions<object, Error, number>>,
) =>
  useMutation({
    mutationFn: (id: number) => deleteSession(id),
    ...options,
  });
