import axios, { AxiosInstance } from "axios";
import { getToken } from "../LocalStorage";

export class APIClient {
  private _instance: AxiosInstance;
  constructor() {
    this._instance = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      timeout: 30_000,
    });
  }

  async send(method: "GET" | "POST" | "PUT", path: string, data?: object) {
    const extraConfig = {
      params: method === "GET" ? data : undefined,
      data: ["POST", "PUT"].includes(method) ? data : undefined,
    };
    const response = await this._instance.request({
      method,
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
      url: path,
      ...extraConfig,
    });
    return response.data;
  }
}

export const delayForDev = async () => {
  return await new Promise<void>((resolve, _) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
};
