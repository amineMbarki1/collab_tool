import { ReactNode, useEffect } from "react";
import { Notification, NewPostNotification } from "../types";

import { useAppStore } from "@/hooks";
import { receivedNotification } from "../notificationsSlice";
import { receivedMessage } from "@/features/chat";
import { ReceivedMessage as ReceivedMessageType } from "@/features/chat/types";

const BASE_URL = "http://localhost:8080/api/notifications";

export default function Test({ children }: { children: ReactNode }) {
  const { dispatch, useAppSelector } = useAppStore();

  const id = useAppSelector((state) => state.auth.user?.id);

  useEffect(() => {
    const eventSource: EventSource = new EventSource(`${BASE_URL}/${id!}`);

    // eventSource.onmessage = (message) => {
    //   console.log("=========", message);
    // };
    eventSource.addEventListener("notification", (e) => {
      const notification = JSON.parse(e.data) as Notification;
      if (isNewPostNotification(notification)) notification.type = "newPost";
      else notification.type = "topicInvite";
      dispatch(receivedNotification(notification));
    });

    eventSource.addEventListener("NEW_MESSAGE", (e) => {
      const message: ReceivedMessageType = { ...JSON.parse(e.data), direction: "RECEIVED" };
      dispatch(receivedMessage(message));
    });

    return () => eventSource.close();
  }, [dispatch, id]);

  return children;
}

function isNewPostNotification(
  notification: Notification
): notification is NewPostNotification {
  return (notification as NewPostNotification).postId !== undefined;
}
