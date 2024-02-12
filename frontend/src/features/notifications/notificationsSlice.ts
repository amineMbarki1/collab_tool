import { createSlice, Middleware } from "@reduxjs/toolkit";

import { Notification } from "./types";
import { RootState } from "@/store";
import { EventSourcePolyfill } from "event-source-polyfill";

const BASE_URL = "http://localhost:8080/api/notifications";

const initialState: Notification[] = [];

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState: initialState,
  reducers: {
    received: (state, action) => {
      state.push(action.payload);
    },
  },
});

const { received } = notificationsSlice.actions;

export function connectAction(): ConnectAction {
  return { type: "notifications/connect" };
}

export function disconnectAction(): DisconnectAction {
  return { type: "notifications/disconnect" };
}

export default notificationsSlice.reducer;

export const notificationsMiddleware =
  (store) => (next) => (action: Action) => {
    let eventSource!: EventSourcePolyfill;

    if (action.type === "notifications/connect") {
      const state = store.getState() as RootState;
      const userId = state.auth.user!.id;
      const token = state.auth.accessToken;

      eventSource = new EventSourcePolyfill(`${BASE_URL}/${2}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      eventSource.onmessage = (message) => {
        store.dispatch(received(JSON.parse(message.data)));
      };
    }

    if (action.type === "notifications/disconnect") {
      if (eventSource != undefined) eventSource.close();
    }

    next(action);
  };

interface ConnectAction {
  type: "notifications/connect";
}

interface DisconnectAction {
  type: "notifications/disconnect";
}

type Action = DisconnectAction | ConnectAction;
