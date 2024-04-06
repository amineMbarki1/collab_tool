import { Notification } from "@/features/notifications";
import httpClient from "./Httpclient";

export function getNotifications() {
  return httpClient
    .get<Notification[]>("/notifications")
    .then((res) => res.data);
}
