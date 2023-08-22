import { httpPost } from "./ApiClient";

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
  return await httpPost(`/signup`, request);
};

export const postSignin = async (
  request: AuthRequest
): Promise<AuthResponse> => {
  return await httpPost(`/signin`, request);
};
