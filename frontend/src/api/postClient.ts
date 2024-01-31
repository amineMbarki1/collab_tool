import httpClient from "./Httpclient";
import { Post, PostRequest } from "@/features/topics/types";

export async function createPost({ topicId, content }: PostRequest) {
  const { data } = await httpClient.post<Post>(`/topics/${topicId}/posts`, {
    content: content,
  });

  return data;
}

export async function getAllPostsByTopicId({ topicId }: { topicId: number }) {
  const { data } = await httpClient.get<Post[]>(`/topics/${topicId}/posts`);
  return data;
}
