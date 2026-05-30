import type { Result, Message } from "@weather-space/shared";
import { httpService } from "../../../services/http.service";

export const messageService = {
  async sendMessage(city: string, message: string): Promise<Result<Message>> {
    return httpService.post<Message>("/message", { city, message });
  },
};
