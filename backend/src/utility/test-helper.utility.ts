import { Result } from "../types/result.type";

export function assertSuccessResult<T>(
  result: Result<T>,
): asserts result is { success: true; data: T } {
  expect(result.success).toBe(true);
  if (!result.success) {
    throw new Error(
      `Expected success but got failure: ${result.error} (${result.code})`,
    );
  }
}

export function assertFailureResult<T>(
  result: Result<T>,
): asserts result is { success: false; error: string; code: string } {
  expect(result.success).toBe(false);
  if (result.success) {
    throw new Error(`Expected failure but got success`);
  }
}
