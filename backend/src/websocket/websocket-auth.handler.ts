import { authPayloadSchema } from "@weather-space/shared";
import { AppWebSocket } from "../types/websocket-message.type";
import { EnvironmentService } from "../services/environment.service";
import { verifyToken } from "../utility/jwt.utility";

export class WebSocketAuthHandler {
  constructor(private readonly environmentService: EnvironmentService) {}

  handle(appWebSocket: AppWebSocket, token: string): void {
    const jwtSecret = this.environmentService.getJwtSecret();

    if (!jwtSecret) {
      appWebSocket.send(
        JSON.stringify({
          type: "auth",
          status: "error",
          error: "JWT_SECRET is not configured",
        }),
      );
      appWebSocket.terminate();
      return;
    }

    const verifyResult = verifyToken(token, jwtSecret);

    if (!verifyResult.success) {
      appWebSocket.send(
        JSON.stringify({
          type: "auth",
          status: "error",
          error: verifyResult.errorMessage,
        }),
      );
      appWebSocket.terminate();
      return;
    }

    const parseResult = authPayloadSchema.safeParse(verifyResult.data);

    if (!parseResult.success) {
      appWebSocket.send(
        JSON.stringify({
          type: "auth",
          status: "error",
          error: "Invalid token payload",
        }),
      );
      appWebSocket.terminate();
      return;
    }

    appWebSocket.user = parseResult.data;
    appWebSocket.send(JSON.stringify({ type: "auth", status: "ok" }));
  }
}
