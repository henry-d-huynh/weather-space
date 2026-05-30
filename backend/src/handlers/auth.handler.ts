import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { loginRequestSchema } from "../types/auth-request.type";
import { LoginData } from "@weather-space/shared";

export class AuthHandler {
  constructor(private readonly authService: AuthService) {}

  login(
    request: Request,
    response: Response<LoginData | { error: string }>,
  ): void {
    const parseResult = loginRequestSchema.safeParse(request.body);

    if (!parseResult.success) {
      response.status(400).json({ error: parseResult.error.message });
      return;
    }

    const { username, password } = parseResult.data;
    const result = this.authService.login(username, password);

    if (!result.success) {
      response.status(401).json({ error: result.errorMessage });
      return;
    }

    response
      .status(200)
      .json({ token: result.data.token, name: result.data.name });
  }
}
