import { APIClient } from "./ApiClient";

export type AuthResponse = {
  token: string;
};

export type AuthRequest = {
  email: string;
  password: string;
};

export const postSignup = async (
  request: AuthRequest
): Promise<AuthResponse> => {
  return await new APIClient().send("POST", "/signup", request);
};

export const postSignin = async (
  request: AuthRequest
): Promise<AuthResponse> => {
  return await new APIClient().send("POST", "/signin", request);
};
