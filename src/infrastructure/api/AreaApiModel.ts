import { httpGet, httpPut } from "./ApiClient";

export type AreaResponse = {
  id: number;
  name: string;
  prefecture: string;
  url: string;
  description: string;
};

export type PutAreaDescriptionRequest = {
  description: string;
};

export const getAreas = async (): Promise<AreaResponse[]> => {
  return await httpGet("/area");
};

export const getArea = async (id: number): Promise<AreaResponse> => {
  return await httpGet(`/area/${id}`);
};

export const putAreaDescription = async (
  id: number,
  description: string
): Promise<void> => {
  const request: PutAreaDescriptionRequest = { description };
  return await httpPut(`/area/${id}/description`, request);
};
