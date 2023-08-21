import axios from "axios";

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
  const response = await axios.post("http://localhost:8000/signup", request);
  const responseData = JSON.parse(JSON.stringify(response.data));
  return responseData as AuthResponse;
};

export const postSignin = async (
  request: AuthRequest
): Promise<AuthResponse> => {
  const response = await axios.post("http://localhost:8000/signin", request);
  const responseData = JSON.parse(JSON.stringify(response.data));
  return responseData as AuthResponse;
};
