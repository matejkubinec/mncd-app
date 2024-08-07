import { useMutation, useQuery } from '@tanstack/react-query';
import { addSession, getSessions } from '../../api/session';

export const useSessions = () =>
  useQuery({
    queryKey: ['sessions'],
    queryFn: getSessions,
  });

export const useAddSession = () =>
  useMutation({
    mutationFn: addSession,
  });
