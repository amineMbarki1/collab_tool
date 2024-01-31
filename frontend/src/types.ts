export type Status = "idle" | "loading" | "succeeded" | "failed";
export interface User {
  email: string;
  firstName: string;
  lastName: string;
  id: number;
}

export interface SearchUsersRequest {
  email?: string;
  fullName?: string;
  emailOrFullName?: string;
}
