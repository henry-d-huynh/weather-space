import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Message, SendMessageRequest } from "@weather-space/shared";
import { type Loadable, LOADABLE_STATUS } from "../../../types/loadable.type";
import { messageService } from "../services/message.service";

type MessagesState = {
  alerts: Message[];
  unreadCount: number;
  sendMessage: Loadable<Message>;
};

const initialState: MessagesState = {
  alerts: [],
  unreadCount: 0,
  sendMessage: {
    status: LOADABLE_STATUS.IDLE,
  },
};

const sendMessageThunk = createAsyncThunk<Message, SendMessageRequest>(
  "messages/send",
  async (sendMessageRequest: SendMessageRequest, { rejectWithValue }) => {
    const result = await messageService.sendMessage(sendMessageRequest);
    if (!result.success) return rejectWithValue(result.errorMessage);
    return result.data;
  },
);

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessageThunk.pending, (state) => {
        state.sendMessage = { status: LOADABLE_STATUS.LOADING };
      })
      .addCase(sendMessageThunk.fulfilled, (state, action) => {
        state.sendMessage = {
          status: LOADABLE_STATUS.LOADED,
          data: action.payload,
        };
      })
      .addCase(sendMessageThunk.rejected, (state, action) => {
        state.sendMessage = {
          status: LOADABLE_STATUS.ERROR,
          error: action.error.message,
        };
      });
  },
});

const getAlerts = (state: MessagesState) => state.alerts;
const getUnreadCount = (state: MessagesState) => state.unreadCount;
const getHasUnread = (state: MessagesState) => state.unreadCount > 0;

export const messagesSlice = {
  reducer: slice.reducer,
  actions: {
    ...slice.actions,
    sendMessageThunk,
  },
  selectors: {
    getAlerts,
    getUnreadCount,
    getHasUnread,
  },
};
