/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, Middleware } from "@reduxjs/toolkit";

import { NewPostNotification, Notification } from "./types";
import { RootState } from "@/store";

const BASE_URL = "http://localhost:8080/api/notifications";

const initialState: Notification[] = [];

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState: initialState,
  reducers: {
    receivedNotification: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { receivedNotification } = notificationsSlice.actions;

export function connectAction(): ConnectAction {
  return { type: "notifications/connect" };
}

export function disconnectAction(): DisconnectAction {
  return { type: "notifications/disconnect" };
}

export default notificationsSlice.reducer;

export const notificationsMiddleware: Middleware =
  (store) => (next) => (action) => {
    let eventSource!: EventSource;

    if (action.type === "notifications/connect") {
      const state = store.getState() as RootState;
     //TODO: Change these when done testing
      const userId = state.auth.user!.id;
      const token = state.auth.accessToken;

      eventSource = new EventSource(`${BASE_URL}/${2}`);

      eventSource.onmessage = (message) => {
        const notification = JSON.parse(message.data) as Notification;

        if (isNewPostNotification(notification)) notification.type = "newPost";
        else notification.type = "topicInvite";

        store.dispatch(received(notification));
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

function isNewPostNotification(
  notification: Notification
): notification is NewPostNotification {
  return (notification as NewPostNotification).postId !== undefined;
}
