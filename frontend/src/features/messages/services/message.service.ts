import type {
  Result,
  Message,
  SendMessageRequest,
} from "@weather-space/shared";
import { httpService } from "../../../services/http.service";

export const messageService = {
  async sendMessage(
    sendMessageRequest: SendMessageRequest,
  ): Promise<Result<Message>> {
    return httpService.post<Message>("/message", sendMessageRequest);
  },
};
