import { ReactNode, useEffect } from "react";
import { Notification, NewPostNotification } from "../types";

import { useAppStore } from "@/hooks";
import { receivedNotification } from "../notificationsSlice";

const BASE_URL = "http://localhost:8080/api/notifications";

export default function Test({ children }: { children: ReactNode }) {
  const { dispatch } = useAppStore();

  useEffect(() => {
    const eventSource: EventSource = new EventSource(`${BASE_URL}/${2}`);

    // //TODO: Change these when done testing
    // const userId = state.auth.user!.id;
    // const token = state.auth.accessToken;

    eventSource.onmessage = (message) => {
      //   const notification = JSON.parse(message.data) as Notification;

      console.log("=========", message);

      //   if (isNewPostNotification(notification)) notification.type = "newPost";
      //   else notification.type = "topicInvite";

      //   dispatch(receivedNotification(notification));
    };
    eventSource.addEventListener("notification", (e) => {
      const notification = JSON.parse(e.data) as Notification;
      if (isNewPostNotification(notification)) notification.type = "newPost";
      else notification.type = "topicInvite";
      dispatch(receivedNotification(notification));
    });

    return () => eventSource.close();
  }, [dispatch]);

  return children;
}

function isNewPostNotification(
  notification: Notification
): notification is NewPostNotification {
  return (notification as NewPostNotification).postId !== undefined;
}
