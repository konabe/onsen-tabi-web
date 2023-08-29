import axios, { AxiosRequestConfig } from "axios";
import { getToken } from "../LocalStorage";

const baseURL = () => process.env.REACT_APP_BASE_URL;

export const httpGet = async <T>(path: string, query?: object): Promise<T> => {
  const config: AxiosRequestConfig = {};
  if (query !== undefined) {
    config.params = { ...query };
  }
  config.headers = { Authorization: `Bearer ${getToken()}` };
  const response = await axios.get(`${baseURL()}${path}`, config);
  const responseData = JSON.parse(JSON.stringify(response.data));
  return responseData as T;
};

export const httpPut = async <T>(path: string, data: object): Promise<T> => {
  const config: AxiosRequestConfig = {};
  config.headers = { Authorization: `Bearer ${getToken()}` };
  const response = await axios.put(`${baseURL()}${path}`, data, config);
  const responseData = JSON.parse(JSON.stringify(response.data));
  return responseData as T;
};

export const httpPost = async <T>(path: string, data: object): Promise<T> => {
  const config: AxiosRequestConfig = {};
  config.headers = { Authorization: `Bearer ${getToken()}` };
  const response = await axios.post(`${baseURL()}${path}`, data, config);
  const responseData = JSON.parse(JSON.stringify(response.data));
  return responseData as T;
};

export const delayForDev = async () => {
  return await new Promise<void>((resolve, _) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
};
