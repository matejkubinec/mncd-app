export interface ApiResponse<T> {
  data: T;
}

export type ValidationError = {
  message: string;
};

export type ApiValidationError = {
  errors: {
    format: string[];
  };
};

export type ApiError = ValidationError | ApiValidationError;
