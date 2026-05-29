import { WebSocketServerService } from "./websocket.server";
import { WebSocketAuthHandler } from "./websocket-auth.handler";
import { WebSocketSubscriptionHandler } from "./websocket-subscription.handler";
import { AppWebSocket } from "../types/websocket-message.type";
import { WebSocket } from "ws";

const mockAuthHandler = {
  handle: vi.fn(),
} as unknown as WebSocketAuthHandler;

const mockSubscriptionHandler = {
  handle: vi.fn(),
} as unknown as WebSocketSubscriptionHandler;

const mockAppWebSocket = (
  city: string | null = null,
  user: object | null = null,
) =>
  ({
    city,
    user,
    isAlive: true,
    readyState: WebSocket.OPEN,
    send: vi.fn(),
    terminate: vi.fn(),
    ping: vi.fn(),
  }) as unknown as AppWebSocket;

describe("WebSocketServerService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("broadcastToCity", () => {
    it("should return 0 when server is not initialized", () => {
      const service = new WebSocketServerService(
        mockAuthHandler,
        mockSubscriptionHandler,
      );

      const count = service.broadcastToCity("Melbourne", "Storm warning");

      expect(count).toBe(0);
    });
  });

  describe("handleMessage", () => {
    it("should call auth handler on auth message", () => {
      const service = new WebSocketServerService(
        mockAuthHandler,
        mockSubscriptionHandler,
      );
      const appWebSocket = mockAppWebSocket();

      service["handleMessage"](
        appWebSocket,
        JSON.stringify({ type: "auth", token: "some_token" }),
      );

      expect(mockAuthHandler.handle).toHaveBeenCalledWith(
        appWebSocket,
        "some_token",
      );
    });

    it("should call subscription handler on subscribe message when user is set", () => {
      const service = new WebSocketServerService(
        mockAuthHandler,
        mockSubscriptionHandler,
      );
      const appWebSocket = mockAppWebSocket(null, {
        username: "johnSmith",
        name: "John Smith",
      });

      service["handleMessage"](
        appWebSocket,
        JSON.stringify({ type: "subscribe", city: "Melbourne" }),
      );

      expect(mockSubscriptionHandler.handle).toHaveBeenCalledWith(
        appWebSocket,
        "Melbourne",
      );
    });

    it("should not call subscription handler when user is not set", () => {
      const service = new WebSocketServerService(
        mockAuthHandler,
        mockSubscriptionHandler,
      );
      const appWebSocket = mockAppWebSocket();

      service["handleMessage"](
        appWebSocket,
        JSON.stringify({ type: "subscribe", city: "Melbourne" }),
      );

      expect(mockSubscriptionHandler.handle).not.toHaveBeenCalled();
    });

    it("should ignore malformed messages", () => {
      const service = new WebSocketServerService(
        mockAuthHandler,
        mockSubscriptionHandler,
      );
      const appWebSocket = mockAppWebSocket();

      expect(() =>
        service["handleMessage"](appWebSocket, "invalid json"),
      ).not.toThrow();
    });
  });
});
