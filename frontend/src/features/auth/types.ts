import { User } from "@/types";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string | null;
  user: User | null;
}

export interface AuthUser extends LoginResponse {
  isAuthenticated: boolean;
  user: User;
}

export interface SignupRequest {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

export interface SignupResponse {
  user: User;
}
