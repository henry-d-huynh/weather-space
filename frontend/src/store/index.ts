import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../features/auth/store/auth.slice.ts";
import { weatherSlice } from "../features/weather/store/weather.slice.ts";
import { messagesSlice } from "../features/messages/store/messages.slice.ts";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    weather: weatherSlice.reducer,
    messages: messagesSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
