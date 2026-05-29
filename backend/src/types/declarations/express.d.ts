import { AuthPayload } from "../auth-payload.type";

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}
