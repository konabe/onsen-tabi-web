import { APIClient } from "../api/ApiClient";

export type AuthResponse = {
  token: string;
};

export type AuthRequest = {
  email: string;
  password: string;
};

export class UserRepository {
  constructor(private _apiClient: APIClient = new APIClient()) {}

  async signUp(email: string, password: string): Promise<string> {
    const request: AuthRequest = {
      email,
      password,
    };
    const response = (await this._apiClient.send(
      "POST",
      "/signup",
      request
    )) as AuthResponse;
    return response.token;
  }

  async signIn(email: string, password: string): Promise<string> {
    const request: AuthRequest = {
      email,
      password,
    };
    const response = (await this._apiClient.send(
      "POST",
      "/signin",
      request
    )) as AuthResponse;
    return response.token;
  }
}
