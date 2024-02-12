import { User } from "@/types";

export interface NewPostNotification {
  postId: number;
  topicId: number;
  topicName: number;
  postedBy: User;
  time: Date;
}

export type Notification = NewPostNotification;
