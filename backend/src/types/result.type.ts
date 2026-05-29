export type SuccessResult<T> = {
  success: true;
  data: T;
};

export type FailureResult = {
  success: false;
  code: string;
  errorMessage: string;
  context?: unknown;
};

export type Result<T> = SuccessResult<T> | FailureResult;

export function success<T>(data: T): SuccessResult<T> {
  return { success: true, data };
}

export function failure(
  errorMessage: string,
  code: string,
  context?: unknown,
): FailureResult {
  return { success: false, code, errorMessage, context };
}
