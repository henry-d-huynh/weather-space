import { WebSocketSubscriptionHandler } from "./websocket-subscription.handler";
import { AppWebSocket } from "../types/websocket-message.type";

const mockAppWebSocket = {
  city: null,
  user: null,
  isAlive: true,
  send: vi.fn(),
} as unknown as AppWebSocket;

describe("WebSocketSubscriptionHandler", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockAppWebSocket.city = null;
  });

  describe("handle", () => {
    it("should set city and send subscribed message", () => {
      const handler = new WebSocketSubscriptionHandler();
      handler.handle(mockAppWebSocket, "Melbourne");

      expect(mockAppWebSocket.city).toBe("Melbourne");
      expect(mockAppWebSocket.send).toHaveBeenCalledWith(
        JSON.stringify({ type: "subscribed", city: "Melbourne" }),
      );
    });
  });
});
