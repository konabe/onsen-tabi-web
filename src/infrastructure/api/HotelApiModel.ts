import { httpGet, httpPost } from "./ApiClient";

export type HotelResponse = {
  id: number;
  name: string;
  hasWashitsu: boolean;
  url: string;
};

export type HotelRequest = {
  name: string;
  hasWashitsu: boolean;
  url: string;
};

export const getHotels = async (areaId?: number): Promise<HotelResponse[]> => {
  return await httpGet("/hotel", { area_id: areaId });
};

export const getHotel = async (id: number): Promise<HotelResponse> => {
  return await httpGet(`/hotel/${id}`);
};

export const postHotel = async (
  request: HotelRequest
): Promise<HotelResponse> => {
  return await httpPost("/hotel", request);
};
