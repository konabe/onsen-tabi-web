import axios, { AxiosRequestConfig } from "axios";

const baseURL = () => process.env.REACT_APP_BASE_URL;

export const httpGet = async <T>(path: string, query?: object): Promise<T> => {
  const config: AxiosRequestConfig = {};
  if (query !== undefined) {
    config.params = { ...query };
  }
  const response = await axios.get(`${baseURL()}${path}`, config);
  const responseData = JSON.parse(JSON.stringify(response.data));
  return responseData as T;
};

export const httpPut = async <T>(path: string, data: object): Promise<T> => {
  const response = await axios.put(`${baseURL()}${path}`, data);
  const responseData = JSON.parse(JSON.stringify(response.data));
  return responseData as T;
};

export const httpPost = async <T>(path: string, data: object): Promise<T> => {
  const response = await axios.post(`${baseURL()}${path}`, data);
  const responseData = JSON.parse(JSON.stringify(response.data));
  return responseData as T;
};
