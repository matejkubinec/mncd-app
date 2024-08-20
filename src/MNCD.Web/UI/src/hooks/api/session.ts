import {
  addSession,
  deleteSession,
  getSession,
  getSessions,
  patchSession,
} from '@lib/api/session';
import { Session } from '@lib/types/session';
import { useMutation, useQuery, UseQueryOptions } from '@tanstack/react-query';

export const useSessions = (options?: Partial<UseQueryOptions<Session[]>>) =>
  useQuery({
    queryKey: ['sessions'],
    queryFn: getSessions,
    ...options,
  });

export const useAddSession = () =>
  useMutation({
    mutationFn: addSession,
  });

export const useUpdateSession = () =>
  useMutation({
    mutationFn: patchSession,
  });

export const useSession = (id: number) =>
  useQuery({
    queryKey: ['session', id],
    queryFn: () => getSession(id),
  });

export const useDeleteSession = () =>
  useMutation({
    mutationFn: (id: number) => deleteSession(id),
  });
