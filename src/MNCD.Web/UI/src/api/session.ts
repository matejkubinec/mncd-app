import { AddSessionPayload, Session } from '../lib/types/session.types';
import { api } from './api';

export const getSessions = async () => {
  const res = await api.get<Session[]>('/api/session');
  return res.data;
};

export const addSession = async (payload: AddSessionPayload) => {
  const res = await api.post<Session[], AddSessionPayload>(
    '/api/session',
    payload,
  );
  return res.data;
};
