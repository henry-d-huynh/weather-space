import { MessageService } from "./message.service";
import {
  assertSuccessResult,
  assertFailureResult,
} from "../utility/test-helper.utility";
import { Message } from "@weather-space/shared";

const mockCity = "Melbourne";
const mockMessage = "Storm warning issued";

describe("MessagesService", () => {
  describe("addMessage", () => {
    it("should add a message and return it", () => {
      const messagesService = new MessageService();
      const result = messagesService.addMessage(mockCity, mockMessage);

      const expectedResult: Message = {
        city: mockCity,
        message: mockMessage,
        timestamp: result.success ? result.data.timestamp : expect.anything(),
      };

      assertSuccessResult(result);
      expect(result.data).toEqual(expectedResult);
    });

    it("should return a failure when city is empty", () => {
      const messagesService = new MessageService();
      const result = messagesService.addMessage("", mockMessage);

      assertFailureResult(result);
      expect(result.errorMessage).toBe("City is required");
      expect(result.code).toBe("MessagesService.addMessage");
    });

    it("should return a failure when city is whitespace", () => {
      const messagesService = new MessageService();
      const result = messagesService.addMessage("   ", mockMessage);

      assertFailureResult(result);
      expect(result.errorMessage).toBe("City is required");
      expect(result.code).toBe("MessagesService.addMessage");
    });

    it("should return a failure when message is empty", () => {
      const messagesService = new MessageService();
      const result = messagesService.addMessage(mockCity, "");

      assertFailureResult(result);
      expect(result.errorMessage).toBe("Message is required");
      expect(result.code).toBe("MessagesService.addMessage");
    });

    it("should return a failure when message is whitespace", () => {
      const messagesService = new MessageService();
      const result = messagesService.addMessage(mockCity, "   ");

      assertFailureResult(result);
      expect(result.errorMessage).toBe("Message is required");
      expect(result.code).toBe("MessagesService.addMessage");
    });
  });

  describe("getMessagesByCity", () => {
    it("should return messages for a given city", () => {
      const messagesService = new MessageService();
      messagesService.addMessage(mockCity, mockMessage);
      messagesService.addMessage(mockCity, "Another alert");

      const messages = messagesService.getMessagesByCity(mockCity);

      expect(messages).toHaveLength(2);
      expect(messages[0].city).toBe(mockCity);
      expect(messages[1].city).toBe(mockCity);
    });

    it("should return messages case insensitively", () => {
      const messagesService = new MessageService();
      messagesService.addMessage(mockCity, mockMessage);

      const messages = messagesService.getMessagesByCity("melbourne");

      expect(messages).toHaveLength(1);
    });

    it("should not return messages for other cities", () => {
      const messagesService = new MessageService();
      messagesService.addMessage(mockCity, mockMessage);
      messagesService.addMessage("Sydney", "Sydney alert");

      const messages = messagesService.getMessagesByCity(mockCity);

      expect(messages).toHaveLength(1);
      expect(messages[0].city).toBe(mockCity);
    });

    it("should return empty array when no messages exist for city", () => {
      const messagesService = new MessageService();
      const messages = messagesService.getMessagesByCity(mockCity);

      expect(messages).toHaveLength(0);
    });
  });
});
