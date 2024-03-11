import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ChatMessage } from "./types";
import { createMessage } from "@/api/chatClient";

type ChatPartnerId = number;
type ChatMessageState = ChatMessage & { requestId: string };

interface ChatState {
  messages: Record<ChatPartnerId, ChatMessageState[]>;
}

const initialState: ChatState = {
  messages: {},
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
        direction: "sent",
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
  },
});

export default slice.reducer;

export const createMessageAction = createAsyncThunk("chat/send", createMessage);
