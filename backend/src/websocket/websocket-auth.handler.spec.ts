import { WebSocketAuthHandler } from "./websocket-auth.handler";
import { EnvironmentService } from "../services/environment.service";
import { AppWebSocket } from "../types/websocket-message.type";
import { mock, when, instance, reset } from "ts-mockito";
import jwt from "jsonwebtoken";

const mockEnvironmentService = mock(EnvironmentService);

const mockJwtSecret = "mock-jwt-secret";
const mockUsername = "johnSmith";
const mockName = "John Smith";

const mockAppWebSocket = () =>
  ({
    city: null,
    user: null,
    isAlive: true,
    send: vi.fn(),
    terminate: vi.fn(),
  }) as unknown as AppWebSocket;

describe("WebSocketAuthHandler", () => {
  beforeEach(() => {
    reset(mockEnvironmentService);
    vi.clearAllMocks();
  });

  describe("handle", () => {
    it("should authenticate and send ok on valid token", () => {
      when(mockEnvironmentService.getJwtSecret()).thenReturn(mockJwtSecret);

      const token = jwt.sign(
        { username: mockUsername, name: mockName },
        mockJwtSecret,
      );
      const appWebSocket = mockAppWebSocket();
      const handler = new WebSocketAuthHandler(
        instance(mockEnvironmentService),
      );

      handler.handle(appWebSocket, token);

      expect(appWebSocket.user).toEqual({
        username: mockUsername,
        name: mockName,
      });
      expect(appWebSocket.send).toHaveBeenCalledWith(
        JSON.stringify({ type: "auth", status: "ok" }),
      );
      expect(appWebSocket.terminate).not.toHaveBeenCalled();
    });

    it("should terminate when JWT_SECRET is not configured", () => {
      when(mockEnvironmentService.getJwtSecret()).thenReturn(undefined);

      const appWebSocket = mockAppWebSocket();
      const handler = new WebSocketAuthHandler(
        instance(mockEnvironmentService),
      );

      handler.handle(appWebSocket, "some_token");

      expect(appWebSocket.send).toHaveBeenCalledWith(
        JSON.stringify({
          type: "auth",
          status: "error",
          error: "JWT_SECRET is not configured",
        }),
      );
      expect(appWebSocket.terminate).toHaveBeenCalled();
    });

    it("should terminate when token is invalid", () => {
      when(mockEnvironmentService.getJwtSecret()).thenReturn(mockJwtSecret);

      const appWebSocket = mockAppWebSocket();
      const handler = new WebSocketAuthHandler(
        instance(mockEnvironmentService),
      );

      handler.handle(appWebSocket, "invalid_token");

      expect(appWebSocket.send).toHaveBeenCalledWith(
        JSON.stringify({
          type: "auth",
          status: "error",
          error: "Invalid or expired token",
        }),
      );
      expect(appWebSocket.terminate).toHaveBeenCalled();
    });

    it("should terminate when token payload is invalid", () => {
      when(mockEnvironmentService.getJwtSecret()).thenReturn(mockJwtSecret);

      const token = jwt.sign({ invalidField: "value" }, mockJwtSecret);
      const appWebSocket = mockAppWebSocket();
      const handler = new WebSocketAuthHandler(
        instance(mockEnvironmentService),
      );

      handler.handle(appWebSocket, token);

      expect(appWebSocket.send).toHaveBeenCalledWith(
        JSON.stringify({
          type: "auth",
          status: "error",
          error: "Invalid token payload",
        }),
      );
      expect(appWebSocket.terminate).toHaveBeenCalled();
    });
  });
});
