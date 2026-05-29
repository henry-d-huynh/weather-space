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

    it("should ignore malformed JSON", () => {
      const service = new WebSocketServerService(
        mockAuthHandler,
        mockSubscriptionHandler,
      );
      const appWebSocket = mockAppWebSocket();

      expect(() =>
        service["handleMessage"](appWebSocket, "invalid json"),
      ).not.toThrow();
    });

    it("should ignore valid JSON with an invalid message shape", () => {
      const service = new WebSocketServerService(
        mockAuthHandler,
        mockSubscriptionHandler,
      );
      const appWebSocket = mockAppWebSocket();

      service["handleMessage"](
        appWebSocket,
        JSON.stringify({ type: "unknown" }),
      );

      expect(mockAuthHandler.handle).not.toHaveBeenCalled();
      expect(mockSubscriptionHandler.handle).not.toHaveBeenCalled();
    });
  });

  describe("broadcastToCity", () => {
    const makeService = (clients: object[]) => {
      const service = new WebSocketServerService(
        mockAuthHandler,
        mockSubscriptionHandler,
      );
      service["webSocketServer"] = { clients: new Set(clients) } as any;
      return service;
    };

    it("should send to matching clients and return the count", () => {
      const client = mockAppWebSocket("Melbourne");
      const service = makeService([client]);

      const count = service.broadcastToCity("Melbourne", "Storm warning");

      expect(client.send).toHaveBeenCalledWith(
        JSON.stringify({ type: "alert", message: "Storm warning", city: "Melbourne" }),
      );
      expect(count).toBe(1);
    });

    it("should be case-insensitive when matching city", () => {
      const client = mockAppWebSocket("melbourne");
      const service = makeService([client]);

      const count = service.broadcastToCity("Melbourne", "Storm warning");

      expect(count).toBe(1);
    });

    it("should skip clients in a different city", () => {
      const client = mockAppWebSocket("Sydney");
      const service = makeService([client]);

      const count = service.broadcastToCity("Melbourne", "Storm warning");

      expect(client.send).not.toHaveBeenCalled();
      expect(count).toBe(0);
    });

    it("should skip clients that are not AppWebSocket instances", () => {
      const plainClient = { readyState: WebSocket.OPEN, send: vi.fn() };
      const service = makeService([plainClient]);

      const count = service.broadcastToCity("Melbourne", "Storm warning");

      expect(plainClient.send).not.toHaveBeenCalled();
      expect(count).toBe(0);
    });

    it("should return 0 when server is not initialized", () => {
      const service = new WebSocketServerService(
        mockAuthHandler,
        mockSubscriptionHandler,
      );

      const count = service.broadcastToCity("Melbourne", "Storm warning");

      expect(count).toBe(0);
    });
  });
});
