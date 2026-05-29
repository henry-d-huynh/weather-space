import { Request, Response, NextFunction } from "express";
import { EnvironmentService } from "../services/environment.service";
import { authPayloadSchema } from "../types/auth-payload.type";
import jwt from "jsonwebtoken";

export class AuthMiddleware {
  constructor(private readonly environmentService: EnvironmentService) {}

  authenticate(request: Request, response: Response, next: NextFunction): void {
    const authHeader = request.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      response.status(401).json({ error: "Missing or invalid token" });
      return;
    }

    const token = authHeader.split(" ")[1];
    const jwtSecret = this.environmentService.getJwtSecret();

    if (!jwtSecret) {
      response.status(500).json({ error: "JWT_SECRET is not configured" });
      return;
    }

    try {
      const decoded = jwt.verify(token, jwtSecret);
      const parseResult = authPayloadSchema.safeParse(decoded);

      if (!parseResult.success) {
        response.status(401).json({ error: "Invalid token payload" });
        return;
      }

      request.user = parseResult.data;
      next();
    } catch {
      response.status(401).json({ error: "Invalid or expired token" });
    }
  }
}
