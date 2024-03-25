import {
  SerializedError,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { ChatMessage, RecentMessages } from "./types";
import {
  createMessage,
  getMessages,
  getRecentMessages,
} from "@/api/chatClient";
import { Status, User } from "@/types";
import { getUserById } from "@/api/userClient";
import serializeAxiosError from "@/utils/serializeAxiosError";

type ChatPartnerId = number;
type ChatMessageState = ChatMessage & { requestId: string };

interface ChatState {
  messages: Record<ChatPartnerId, ChatMessageState[]>;
  getMessagesRequestStatus: Record<ChatPartnerId, Status>;
  getPartnerRequestStatus: Record<ChatPartnerId, Status>;
  error: SerializedError | null;
  chatPartners: User[];
  recentMessages: RecentMessages[];
  getRecentMessagesStatus: Status;
}

const initialState: ChatState = {
  messages: {},
  getMessagesRequestStatus: {},
  getPartnerRequestStatus: {},
  error: null,
  chatPartners: [],
  recentMessages: [],
  getRecentMessagesStatus: "idle",
};

const slice = createSlice({
  name: "chat",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(createMessageAction.pending, (state, action) => {
      const chatPartnerId: ChatPartnerId = action.meta.arg.receiverId;
      const requestId = action.meta.requestId;
      const message: ChatMessageState = {
        body: action.meta.arg.body,
        direction: "SENT",
        status: "loading",
        requestId,
      };

      if (state.messages[chatPartnerId])
        state.messages[chatPartnerId].push(message);
      else state.messages[chatPartnerId] = [message];
    });

    builder.addCase(createMessageAction.fulfilled, (state, action) => {
      const chatPartnerId: ChatPartnerId = action.meta.arg.receiverId;
      const message = state.messages[chatPartnerId].find(
        ({ requestId }) => requestId === action.meta.requestId
      );
      message!.status = "succeeded";
    });

    builder.addCase(createMessageAction.rejected, (state, action) => {
      const chatPartnerId: ChatPartnerId = action.meta.arg.receiverId;
      const message = state.messages[chatPartnerId].find(
        ({ requestId }) => requestId === action.meta.requestId
      );
      message!.status = "failed";
    });

    builder.addCase(getMessagesAction.pending, (state, action) => {
      state.getMessagesRequestStatus[action.meta.arg] = "loading";
    });
    builder.addCase(getMessagesAction.fulfilled, (state, action) => {
      state.getMessagesRequestStatus[action.meta.arg] = "succeeded";
      state.messages[action.meta.arg] = action.payload;
    });
    builder.addCase(getMessagesAction.rejected, (state, action) => {
      state.getMessagesRequestStatus[action.meta.arg] = "failed";
    });

    builder.addCase(getChatPartnerAction.pending, (state, action) => {
      state.getPartnerRequestStatus[action.meta.arg] = "loading";
    });
    builder.addCase(getChatPartnerAction.rejected, (state, action) => {
      state.getPartnerRequestStatus[action.meta.arg] = "failed";
      state.error = action.error;
    });
    builder.addCase(getChatPartnerAction.fulfilled, (state, action) => {
      state.getPartnerRequestStatus[action.meta.arg] = "succeeded";
      state.chatPartners.push(action.payload);
    });

    builder.addCase(getRecentMessagesAction.pending, (state) => {
      state.getRecentMessagesStatus = "loading";
    });

    builder.addCase(getRecentMessagesAction.rejected, (state, action) => {
      state.getRecentMessagesStatus = "failed";
      state.error = action.error;
    });

    builder.addCase(getRecentMessagesAction.fulfilled, (state, action) => {
      state.getRecentMessagesStatus = "succeeded";
      state.recentMessages = action.payload;
    });
  },
});

export default slice.reducer;

export const createMessageAction = createAsyncThunk(
  "chat/send",
  createMessage,
  {
    serializeError: serializeAxiosError as (arg: unknown) => SerializedError,
  }
);
export const getMessagesAction = createAsyncThunk(
  "chat/getMessages",
  getMessages
);

export const getChatPartnerAction = createAsyncThunk(
  "chat/getPartner",
  getUserById,
  {
    serializeError: serializeAxiosError as (arg: unknown) => SerializedError,
  }
);

export const getRecentMessagesAction = createAsyncThunk(
  "chat/getRecentMessages",
  getRecentMessages,
  {
    serializeError: serializeAxiosError as (arg: unknown) => SerializedError,
  }
);
