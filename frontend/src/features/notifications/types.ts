import { User } from "@/types";

export interface NewPostNotification {
  postId: number;
  topicId: number;
  topicName: number;
  postedBy: User;
  time: Date;
  type: "newPost";
}

export interface TopicInviteNotification {
  type: "topicInvite";
  topicName: string;
  topicOwnerName: string;
  topicId:number;
  time: Date;
}

export type Notification = TopicInviteNotification | NewPostNotification;
