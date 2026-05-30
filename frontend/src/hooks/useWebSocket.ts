import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { authSlice } from "../features/auth/store/auth.slice";
import { messagesSlice } from "../features/messages/store/messages.slice";
import { environment } from "../utility/environment.utility";
import { LOADABLE_STATUS } from "../types/loadable.type";
import type { Message } from "@weather-space/shared";
import { webSocketMessageSchema } from "../types/websocket-message.type";

export const useWebSocket = () => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) =>
    authSlice.selectors.getAuth(state.auth),
  );
  const selectedCity = useAppSelector((state) => state.weather.selectedCity);
  const selectedCityRef = useRef(selectedCity);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    selectedCityRef.current = selectedCity;
  }, [selectedCity]);

  useEffect(() => {
    if (authState.status !== LOADABLE_STATUS.LOADED) return;

    const webSocket = new WebSocket(environment.wsUrl);
    socketRef.current = webSocket;

    webSocket.onopen = () => {
      webSocket.send(
        JSON.stringify({ type: "auth", token: authState.data.token }),
      );
    };

    webSocket.onmessage = (event) => {
      const parsed = webSocketMessageSchema.safeParse(
        JSON.parse(event.data.toString()),
      );

      if (!parsed.success) {
        console.error("Invalid WebSocket message", parsed.error);
        return;
      }

      const message = parsed.data;

      if (message.type === "subscribed") {
        console.log(`Subscribed to ${message.city}`);
      }

      if (message.type === "auth" && message.status === "ok") {
        webSocket.send(
          JSON.stringify({ type: "subscribe", city: selectedCityRef.current }),
        );
      }

      if (message.type === "alert") {
        const alert: Message = {
          city: message.city,
          message: message.message,
          timestamp: {
            type: "date",
            format: "iso8601",
            value: new Date().toISOString(),
          },
        };
        dispatch(messagesSlice.actions.addAlert(alert));
      }
    };

    webSocket.onclose = () => {
      console.log("WebSocket disconnected");
    };

    webSocket.onerror = (error) => {
      console.error("WebSocket error", error);
    };

    return () => {
      webSocket.close();
    };
  }, [authState.status]);

  const subscribeToCity = (city: string) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ type: "subscribe", city }));
    }
  };

  return { subscribeToCity };
};
