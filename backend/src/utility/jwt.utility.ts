import { verify, JwtPayload } from "jsonwebtoken";
import { Result, success, failure } from "@weather-space/shared";

export function verifyToken(
  token: string,
  secret: string,
): Result<JwtPayload | string> {
  try {
    return success(verify(token, secret));
  } catch {
    return failure({
      errorMessage: "Invalid or expired token",
      code: "verifyToken",
    });
  }
}
