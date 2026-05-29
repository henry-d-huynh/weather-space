import { Result, success, failure } from "../types/result.type";
import { Message } from "../types/message.type";
import { toIsoDate } from "../utility/iso-date.utility";

export class MessageService {
  private messages: ReadonlyArray<Message> = [];

  addMessage(city: string, message: string): Result<Message> {
    if (!city.trim()) {
      return failure({
        errorMessage: "City is required",
        code: "MessagesService.addMessage",
      });
    }

    if (!message.trim()) {
      return failure({
        errorMessage: "Message is required",
        code: "MessagesService.addMessage",
      });
    }

    const newMessage: Message = {
      city,
      message,
      timestamp: toIsoDate(new Date()),
    };

    this.messages = [...this.messages, newMessage];

    return success(newMessage);
  }

  getMessagesByCity(city: string): ReadonlyArray<Message> {
    return this.messages.filter(
      (message) => message.city.toLowerCase() === city.toLowerCase(),
    );
  }
}
