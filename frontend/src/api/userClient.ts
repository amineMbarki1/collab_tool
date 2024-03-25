import { SearchUsersRequest, User } from "@/types";
import httpClient from "./Httpclient";



export async function getTeam() {
  const { data } = await httpClient.get<User[]>("/users/me/team-members");
  return data;
}

export async function addMember(id: number) {
  const { data } = await httpClient.post<string>("/users/me/team-members", {
    id,
  });
  return data;
}

export async function removeMember(id: number) {
  const { data } = await httpClient.delete<string>(
    `/users/me/team-members/${id}`
  );
  return data;
}

export async function getUsers() {
  const { data } = await httpClient.get<User[]>("/users");
  return data;
}

//Search users by a prefix that can be in their email or full name
export async function searchUsers(searchRequest: SearchUsersRequest) {
  const { data } = await httpClient.post<User[]>(
    `/users/search`,
    searchRequest
  );

  return data;
}

export async function getUserById(id: number) {
  const { data } = await httpClient.get<User>(`/users/${id}`);

  return data;
}
