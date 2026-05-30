import axios from "axios";
import type { Result } from "@weather-space/shared";
import { success, failure } from "@weather-space/shared";
import { environment } from "../utility/environment.utility";

const client = axios.create({
  baseURL: environment.apiUrl,
});

export const httpService = {
  setAuthToken(token: string): void {
    client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  },

  clearAuthToken(): void {
    delete client.defaults.headers.common["Authorization"];
  },

  async get<T>(url: string): Promise<Result<T>> {
    try {
      const response = await client.get<T>(url);
      return success(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return failure({
          errorMessage: error.response?.data?.error ?? "Request failed",
          code: "httpService.get",
          context: error,
        });
      }
      return failure({
        errorMessage: "An unexpected error occurred",
        code: "httpService.get",
        context: error,
      });
    }
  },

  async post<T>(url: string, data?: unknown): Promise<Result<T>> {
    try {
      const response = await client.post<T>(url, data);
      return success(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return failure({
          errorMessage: error.response?.data?.error ?? "Request failed",
          code: "httpService.post",
          context: error,
        });
      }
      return failure({
        errorMessage: "An unexpected error occurred",
        code: "httpService.post",
        context: error,
      });
    }
  },
};
