import {
  ApiError,
  ApiResponse,
  ApiValidationError,
  ValidationError,
} from '@lib/types/api';

class Api {
  async get<T>(url: string): Promise<ApiResponse<T>> {
    const res = await fetch(url);
    const { data } = await res.json();
    return { data };
  }

  async post<T, S = undefined>(
    url: string,
    payload?: S,
    formdata?: FormData,
  ): Promise<ApiResponse<T>> {
    const res = await fetch(
      url,
      formdata
        ? {
            method: 'POST',
            body: formdata,
          }
        : {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          },
    );
    const responseData = await res.json();

    if (this.isError(res)) {
      throw this.getError(res, responseData);
    }

    return { data: responseData.data };
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

  private isError(res: Response): boolean {
    return res.status !== 200;
  }

  private getError(res: Response, data: ApiError): Error {
    if ((data as ValidationError).message) {
      return new Error((data as ValidationError).message);
    }

    if ((data as ApiValidationError).errors) {
      return new Error((data as ApiValidationError).errors.format[0]);
    }

    return new Error(res.statusText);
  }
}

export const api = new Api();
