import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Message } from "@weather-space/shared";

type MessagesState = {
  alerts: Message[];
  unreadCount: number;
};

const initialState: MessagesState = {
  alerts: [],
  unreadCount: 0,
};

const slice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addAlert: (state, action: PayloadAction<Message>) => {
      state.alerts = [action.payload, ...state.alerts];
      state.unreadCount += 1;
    },
    markAllAsRead: (state) => {
      state.unreadCount = 0;
    },
    clearAlerts: (state) => {
      state.alerts = [];
      state.unreadCount = 0;
    },
  },
});

const getAlerts = (state: MessagesState) => state.alerts;
const getUnreadCount = (state: MessagesState) => state.unreadCount;
const getHasUnread = (state: MessagesState) => state.unreadCount > 0;

export const messagesSlice = {
  reducer: slice.reducer,
  actions: slice.actions,
  selectors: {
    getAlerts,
    getUnreadCount,
    getHasUnread,
  },
};
