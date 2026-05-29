import { FailureResult, Result, SuccessResult } from "../types/result.type";

export function assertSuccessResult<T>(
  result: Result<T>,
): asserts result is SuccessResult<T> {
  expect(result.success).toBe(true);
  if (!result.success) {
    throw new Error(
      `Expected success but got failure: ${result.errorMessage} (${result.code})`,
    );
  }
}

export function assertFailureResult<T>(
  result: Result<T>,
): asserts result is FailureResult {
  expect(result.success).toBe(false);
  if (result.success) {
    throw new Error(`Expected failure but got success`);
  }
}
