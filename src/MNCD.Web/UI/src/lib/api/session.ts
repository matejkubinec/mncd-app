import {
  AddSessionPayload,
  PatchSessionPayload,
  Session,
} from '@lib/types/session';
import { api } from './api';

export const getSessions = async () => {
  const res = await api.get<Session[]>('/api/session');
  return res.data;
};

export const getSession = async (id: number) => {
  const res = await api.get<Session>(`/api/session/${id}`);
  return res.data;
};

export const patchSession = async (payload: PatchSessionPayload) => {
  const res = await api.patch<Session, PatchSessionPayload>(
    `/api/session`,
    payload,
  );
  return res.data;
};

export const addSession = async (payload: AddSessionPayload) => {
  const res = await api.post<Session, AddSessionPayload>(
    '/api/session',
    payload,
  );
  return res.data;
};

export const deleteSession = async (id: number) => {
  const res = await api.delete(`/api/session/${id}`);
  return res.data;
};
