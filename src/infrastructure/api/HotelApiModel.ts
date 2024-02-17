import { HotelModel } from "../../share/hotel";
import { httpGet, httpPost, httpPut } from "./ApiClient";

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
  return await httpGet("/hotel", { area_id: areaId });
};

export const getHotel = async (id: number): Promise<HotelResponse> => {
  return await httpGet(`/hotel/${id}`);
};

export const putHotel = async (
  id: number,
  request: HotelRequest
): Promise<void> => {
  return await httpPut(`/hotel/${id}`, request);
};

export const postHotel = async (
  request: HotelRequest
): Promise<HotelResponse> => {
  return await httpPost("/hotel", request);
};
