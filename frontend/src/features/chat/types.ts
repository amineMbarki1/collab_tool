import { Status } from "@/types";

export interface ChatMessage {
  body: string;
  direction: "sent" | "received";
  status: Exclude<Status, "idle">;
}

export interface ChatMessageRequest {
  senderId: number;
  receiverId: number;
  body: string;
}
