import { ApiResponse } from '../lib/types/api.types';

class Api {
  async get<T>(url: string): Promise<ApiResponse<T>> {
    const res = await fetch('http://localhost:8080' + url);
    const { data } = await res.json();
    return { data };
  }

  async post<T, S = undefined>(
    url: string,
    payload?: S,
  ): Promise<ApiResponse<T>> {
    const res = await fetch('http://localhost:8080' + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    const { data } = await res.json();
    return { data };
  }
}

export const api = new Api();
