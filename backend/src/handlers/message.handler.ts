import { Request, Response } from "express";
import { MessageService } from "../services/message.service";
import { messageRequestSchema } from "../types/message-request.type";
import { WebSocketServerService } from "../websocket/websocket.server";

export class MessageHandler {
  constructor(
    private readonly messageService: MessageService,
    private readonly webSocketServerService: WebSocketServerService,
  ) {}

  addMessage(request: Request, response: Response): void {
    const parseResult = messageRequestSchema.safeParse(request.body);

    if (!parseResult.success) {
      response.status(400).json({ error: parseResult.error.message });
      return;
    }

    const { city, message } = parseResult.data;
    const result = this.messageService.addMessage(city, message);

    if (!result.success) {
      response.status(500).json({ error: result.errorMessage });
      return;
    }

    this.webSocketServerService.broadcastToCity(city, message);

    response.status(201).json(result.data);
  }
}
