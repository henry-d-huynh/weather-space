import axios from "axios";
import { Result, success, failure } from "../types/result.type";

export class HttpService {
  async get<T>(url: string): Promise<Result<T>> {
    try {
      const response = await axios.get<T>(url);
      return success(response.data);
    } catch (error) {
      return failure({
        errorMessage: `GET request failed: ${url}`,
        code: "HttpService.get",
        context: error,
      });
    }
  }
}
