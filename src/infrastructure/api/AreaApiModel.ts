import { httpGet } from "./ApiClient";

export type AreaResponse = {
  id: number;
  name: string;
  prefecture: string;
  url: string;
};

export const getAreas = async (): Promise<AreaResponse[]> => {
  return await httpGet("/area");
};

export const getArea = async (id: number): Promise<AreaResponse> => {
  return await httpGet(`/area/${id}`);
};
