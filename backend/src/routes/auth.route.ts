import { Router } from "express";
import { AuthHandler } from "../handlers/auth.handler";

export function createAuthRouter(authHandler: AuthHandler): Router {
  const router = Router();

  router.post("/login", (request, response) =>
    authHandler.login(request, response),
  );

  return router;
}
