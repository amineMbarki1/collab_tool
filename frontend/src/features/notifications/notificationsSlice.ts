/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { NewPostNotification, Notification } from "./types";
import { Status } from "@/types";
import { getNotifications } from "@/api/notificationClient";

const initialState = { notifications: [], getNotificationsStatus: "idle" } as {
  notifications: Notification[];
  getNotificationsStatus: Status;
};

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState: initialState,
  reducers: {
    receivedNotification: (state, action) => {
      state.notifications.push(action.payload);
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getNotificationsAction.fulfilled, (state, action) => {
      if (state.getNotificationsStatus === "idle") {
        state.notifications = action.payload.map((notification) => {
          if (isNewPostNotification(notification))
            return { ...notification, type: "newPost" };
          else return { ...notification, type: "topicInvite" };
        });
        state.getNotificationsStatus = "succeeded";
      }
    });
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

interface ConnectAction {
  type: "notifications/connect";
}

interface DisconnectAction {
  type: "notifications/disconnect";
}

export const getNotificationsAction = createAsyncThunk(
  "notifications/get",
  getNotifications
);
// function isNewPostNotification(
//   notification: Notification
// ): notification is NewPostNotification {
//   return (notification as NewPostNotification).postId !== undefined;
// }

function isNewPostNotification(
  notification: Notification
): notification is NewPostNotification {
  return (notification as NewPostNotification).postId !== undefined;
}
