import { Router } from "express";
import { MessageHandler } from "../handlers/message.handler";

export function createMessageRouter(messageHandler: MessageHandler): Router {
  const router = Router();

  router.post("/", (request, response) =>
    messageHandler.addMessage(request, response),
  );

  return router;
}
