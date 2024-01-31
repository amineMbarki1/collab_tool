import { AddMemberRequest, Topic, TopicRequest } from "@/features/topics/types";
import httpClient from "./Httpclient";
import { User } from "@/types";

export async function createTopic(topic: TopicRequest) {
  const { data } = await httpClient.post<Topic>("/topics", topic);
  return data;
}

export async function getTopics() {
  const { data } = await httpClient.get<Topic[]>("/topics");
  return data;
}

export async function addMember({ topicId, userId }: AddMemberRequest) {
  const { data } = await httpClient.post<string>(`/topics/${topicId}/members`, {
    id: userId,
  });
  return data;
}

export async function getMembers(topicId: number) {
  const { data } = await httpClient.get<User[]>(`/topics/${topicId}/members`);
  return data;
}
