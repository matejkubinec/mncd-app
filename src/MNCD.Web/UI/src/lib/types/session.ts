import { Analysis } from './analysis';

export interface Session {
  id: number;
  guid: string | null;
  name: string;
  createDate: string;
  analysesCount?: number;
  analyses: Analysis[];
}

export interface AddSessionPayload {
  name: string;
}

export interface PatchSessionPayload {
  id: number;
  name: string;
}
