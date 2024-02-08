import { useEffect } from "react";

import { useAppStore } from "./hooks";

import { EventSourcePolyfill } from "event-source-polyfill";

export default function Test() {
  const { useAppSelector } = useAppStore();
  const token = useAppSelector((state) => state.auth.accessToken);
  useEffect(() => {
    if (token) {
      const eventSource = new EventSourcePolyfill(
        "http://localhost:8080/api/notifications/2",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      eventSource.onmessage = (message) => {
        console.log(message);
      };
    }
  }, [token]);

  return null;
}
