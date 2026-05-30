import type { Result } from "@weather-space/shared";
import { httpService } from "../../../services/http.service.ts";

export type LoginData = {
  token: string;
  name: string;
};

export const authService = {
  async login(username: string, password: string): Promise<Result<LoginData>> {
    return httpService.post<LoginData>("/auth/login", { username, password });
  },
};
