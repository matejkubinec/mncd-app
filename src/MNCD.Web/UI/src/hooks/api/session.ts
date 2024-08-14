import {
  addSession,
  getSession,
  getSessions,
  patchSession,
} from '@lib/api/session';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useSessions = () =>
  useQuery({
    queryKey: ['sessions'],
    queryFn: getSessions,
  });

export const useAddSession = () =>
  useMutation({
    mutationFn: addSession,
  });

export const useUpdateSession = () =>
  useMutation({
    mutationFn: patchSession,
  });

export const useSession = (id: string) =>
  useQuery({
    queryKey: ['session', id],
    queryFn: () => getSession(id),
  });
