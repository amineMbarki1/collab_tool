import { ChatMessage, ChatMessageRequest } from "@/features/chat/types";
import httpClient from "./Httpclient";

export function createMessage(messageRequest: ChatMessageRequest) {
  return httpClient
    .post<ChatMessage>("/api/", messageRequest)
    .then((res) => res.data);
}
