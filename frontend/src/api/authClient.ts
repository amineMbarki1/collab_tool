import httpClient from "./Httpclient";
import { LoginRequest, LoginResponse, SignupRequest } from "@/features/auth";

export async function signup(signupRequest: SignupRequest) {
  const response = await httpClient.post<LoginResponse>(
    "/signup",
    signupRequest
  );
  return response.data;
}

export async function signin(credentials: LoginRequest) {
  const { data } = await httpClient.post<LoginResponse>("/login", credentials);
  return data;
}
