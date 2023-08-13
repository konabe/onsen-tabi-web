import axios from "axios";

export type HotelResponse = {
  id: number;
  name: string;
  hasWashitsu: boolean;
};

export const getHotels = async (): Promise<HotelResponse[]> => {
  const response = await axios.get("http://localhost:8000/hotel");
  const responseData = JSON.parse(JSON.stringify(response.data));
  return responseData as HotelResponse[];
};

export const getHotel = async (id: number): Promise<HotelResponse> => {
  const response = await axios.get(`http://localhost:8000/hotel/${id}`);
  const responseData = JSON.parse(JSON.stringify(response.data));
  return responseData as HotelResponse;
};

export type OnsenResponse = {
  id: number;
  name: string;
  sprintQuality: string;
  liquid: string | null;
  ostomicPressure: string | null;
  form: string;
  description: string;
};

export const getOnsens = async (): Promise<OnsenResponse[]> => {
  const response = await axios.get("http://localhost:8000/onsen");
  const responseData = JSON.parse(JSON.stringify(response.data));
  return responseData as OnsenResponse[];
};

export const getOnsen = async (id: number): Promise<OnsenResponse> => {
  const response = await axios.get(`http://localhost:8000/onsen/${id}`);
  const responseData = JSON.parse(JSON.stringify(response.data));
  return responseData as OnsenResponse;
};

export type PutOnsenDescriptionRequest = {
  description: string;
};

export const putOnsenDescription = async (
  id: number,
  description: string
): Promise<void> => {
  const request: PutOnsenDescriptionRequest = { description };
  await axios.put(`http://localhost:8000/onsen/${id}/description`, request);
};

export type AreaResponse = {
  id: number;
  name: string;
  prefecture: string;
};

export const getAreas = async (): Promise<AreaResponse[]> => {
  const response = await axios.get("http://localhost:8000/area");
  const responseData = JSON.parse(JSON.stringify(response.data));
  return responseData as AreaResponse[];
};
