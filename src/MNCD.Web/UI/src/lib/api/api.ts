import { ApiResponse } from '@lib/types/api';

class Api {
  async get<T>(url: string): Promise<ApiResponse<T>> {
    const res = await fetch(url);
    const { data } = await res.json();
    return { data };
  }

  async post<T, S = undefined>(
    url: string,
    payload?: S,
  ): Promise<ApiResponse<T>> {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    const { data } = await res.json();
    return { data };
  }

  async patch<T, S = undefined>(
    url: string,
    payload?: S,
  ): Promise<ApiResponse<T>> {
    const res = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    const { data } = await res.json();
    return { data };
  }

  async delete<T = object>(url: string): Promise<ApiResponse<T>> {
    const res = await fetch(url, {
      method: 'DELETE',
    });
    const { data } = await res.json();
    return { data };
  }
}

export const api = new Api();
