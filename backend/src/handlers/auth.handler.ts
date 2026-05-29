import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { loginRequestSchema } from "../types/auth-request.type";

export class AuthHandler {
  constructor(private readonly authService: AuthService) {}

  login(req: Request, res: Response): void {
    const parseResult = loginRequestSchema.safeParse(req.body);

    if (!parseResult.success) {
      res.status(400).json({ error: parseResult.error.message });
      return;
    }

    const { username, password } = parseResult.data;
    const result = this.authService.login(username, password);

    if (!result.success) {
      res.status(401).json({ error: result.errorMessage });
      return;
    }

    res.status(200).json({ token: result.data.token, name: result.data.name });
  }
}
