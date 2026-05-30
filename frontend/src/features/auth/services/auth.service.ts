import type {
  LoginCredentials,
  LoginData,
  Result,
} from "@weather-space/shared";
import { httpService } from "../../../services/http.service";

export const authService = {
  async login(loginCredentials: LoginCredentials): Promise<Result<LoginData>> {
    return httpService.post<LoginData>("/auth/login", loginCredentials);
  },
};
