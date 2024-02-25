import { User } from "@/types";

export interface Topic {
  name: string;
  id: number;
  description: string;
  members: User[];
}

export type TopicRequest = Omit<Topic, "id" | "members">;

export interface AddMemberRequest {
  topicId: number;
  userId: number;
}

export interface Post {
  content: string;
  id: number;
  topicId: number;
  user: User;
  createdOn: string;
  lastUpdateOn: string;
}

export interface PostRequest {
  content: string;
  topicId: number;
}
