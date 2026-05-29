import { MessageHandler } from "./message.handler";
import { MessageService } from "../services/message.service";
import { mock, when, instance, reset, anything } from "ts-mockito";
import { Message } from "../types/message.type";
import { toIsoDate } from "../utility/iso-date.utility";

const mockMessageService = mock(MessageService);

const mockCity = "Melbourne";
const mockMessageText = "Storm warning issued";
const mockMessage: Message = {
  city: mockCity,
  message: mockMessageText,
  timestamp: toIsoDate(new Date()),
};

const mockRequest = (body: unknown) => ({ body }) as any;
const mockResponse = () => {
  const response: any = {};
  response.status = vi.fn().mockReturnValue(response);
  response.json = vi.fn().mockReturnValue(response);
  return response;
};

describe("MessageHandler", () => {
  beforeEach(() => {
    reset(mockMessageService);
  });

  describe("addMessage", () => {
    it("should return 201 with message upon success", () => {
      when(mockMessageService.addMessage(anything(), anything())).thenReturn({
        success: true,
        data: mockMessage,
      });

      const handler = new MessageHandler(instance(mockMessageService));
      const request = mockRequest({ city: mockCity, message: mockMessageText });
      const response = mockResponse();

      handler.addMessage(request, response);

      expect(response.status).toHaveBeenCalledWith(201);
      expect(response.json).toHaveBeenCalledWith(mockMessage);
    });

    it("should return 400 when city is missing", () => {
      const handler = new MessageHandler(instance(mockMessageService));
      const request = mockRequest({ message: mockMessageText });
      const response = mockResponse();

      handler.addMessage(request, response);

      expect(response.status).toHaveBeenCalledWith(400);
    });

    it("should return 400 when message is missing", () => {
      const handler = new MessageHandler(instance(mockMessageService));
      const request = mockRequest({ city: mockCity });
      const response = mockResponse();

      handler.addMessage(request, response);

      expect(response.status).toHaveBeenCalledWith(400);
    });

    it("should return 400 when body is empty", () => {
      const handler = new MessageHandler(instance(mockMessageService));
      const request = mockRequest({});
      const response = mockResponse();

      handler.addMessage(request, response);

      expect(response.status).toHaveBeenCalledWith(400);
    });

    it("should return 500 when message service fails", () => {
      when(mockMessageService.addMessage(anything(), anything())).thenReturn({
        success: false,
        errorMessage: "Message is required",
        code: "MessageService.addMessage",
      });

      const handler = new MessageHandler(instance(mockMessageService));
      const request = mockRequest({ city: mockCity, message: mockMessageText });
      const response = mockResponse();

      handler.addMessage(request, response);

      expect(response.status).toHaveBeenCalledWith(500);
      expect(response.json).toHaveBeenCalledWith({
        error: "Message is required",
      });
    });
  });
});
