import { AreaModel } from "../../share/area";
import { APIClient } from "./ApiClient";

export type AreaRequest = AreaModel;

export type AreaResponse = AreaModel & {
  id: number;
  onsenIds: number[];
};

export const getAreas = async (): Promise<AreaResponse[]> => {
  return await new APIClient().send("GET", "/area");
};

export const getArea = async (id: number): Promise<AreaResponse> => {
  return await new APIClient().send("GET", `/area/${id}`);
};

export const putArea = async (
  id: number,
  request: AreaRequest
): Promise<void> => {
  return await new APIClient().send("PUT", `/area/${id}`, request);
};

export const postArea = async (request: AreaRequest): Promise<AreaResponse> => {
  return await new APIClient().send("POST", `/area/`, request);
};
