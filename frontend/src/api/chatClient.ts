import {
  ChatMessage,
  ChatMessageRequest,
  RecentMessages,
} from "@/features/chat/types";
import httpClient from "./Httpclient";

export function createMessage(messageRequest: ChatMessageRequest) {
  return httpClient
    .post<ChatMessage>("/chat", messageRequest)
    .then((res) => res.data);
}

export function getMessages(chatPartnerId: number) {
  return httpClient.get(`/chat/${chatPartnerId}`).then((res) => res.data);
}

export function getRecentMessages() {
  return httpClient
    .get<RecentMessages[]>("/chat/recentMessages")
    .then((res) => res.data);
}
