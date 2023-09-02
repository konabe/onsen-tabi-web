import { AreaModel } from "../../share/area";
import { httpGet, httpPost, httpPut } from "./ApiClient";

export type AreaRequest = AreaModel;

export type AreaResponse = AreaModel & {
  id: number;
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

export const putArea = async (
  id: number,
  request: AreaRequest
): Promise<void> => {
  return await httpPut(`/area/${id}`, request);
};

export const putAreaDescription = async (
  id: number,
  description: string
): Promise<void> => {
  const request: PutAreaDescriptionRequest = { description };
  return await httpPut(`/area/${id}/description`, request);
};

export const postArea = async (request: AreaRequest): Promise<AreaResponse> => {
  return await httpPost(`/area/`, request);
};
