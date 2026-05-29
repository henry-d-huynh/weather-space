export type SuccessResult<T> = {
  success: true;
  data: T;
};

export type FailureResult = {
  success: false;
  code: string;
  error: string;
};

export type Result<T> = SuccessResult<T> | FailureResult;

export function success<T>(data: T): SuccessResult<T> {
  return { success: true, data };
}

export function failure(error: string, code: string): FailureResult {
  return { success: false, code, error };
}
