import { HotelModel } from "../../share/hotel";
import { APIClient } from "./ApiClient";

export type HotelResponse = {
  id: number;
} & HotelModel;

export type HotelRequest = {
  name: string;
  hasWashitsu: boolean;
  url: string;
  description: string;
};

export const getHotels = async (areaId?: number): Promise<HotelResponse[]> => {
  return await new APIClient().send("GET", "/hotel", { area_id: areaId });
};

export const getHotel = async (id: number): Promise<HotelResponse> => {
  return await new APIClient().send("GET", `/hotel/${id}`);
};

export const putHotel = async (
  id: number,
  request: HotelRequest
): Promise<void> => {
  return await new APIClient().send("PUT", `/hotel/${id}`, request);
};

export const postHotel = async (
  request: HotelRequest
): Promise<HotelResponse> => {
  return await new APIClient().send("POST", "/hotel", request);
};
