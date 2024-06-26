import { Status, User } from "@/types";

export interface ChatMessage {
  body: string;
  direction: "SENT" | "RECEIVED";
  status?: Exclude<Status, "idle">;
}

export interface ChatMessageRequest {
  senderId: number;
  receiverId: number;
  body: string;
}

export interface RecentMessages {
  partnerFullName: string;
  partnerId: number;
  lastMessage: string;
}

export interface ReceivedMessage extends ChatMessage {
  from: User;
}
