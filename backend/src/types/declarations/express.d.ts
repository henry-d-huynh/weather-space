import { AuthPayload } from "@weather-space/shared";

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}
