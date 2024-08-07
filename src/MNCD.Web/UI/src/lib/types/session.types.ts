export interface Session {
  id: number;
  guid: string | null;
  name: string;
  createDate: string;
  analysesCount?: number;
}

export interface AddSessionPayload {
  name: string;
}
