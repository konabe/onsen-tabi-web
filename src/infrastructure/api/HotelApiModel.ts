import axios from "axios";

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
  const response = await axios.get("http://localhost:8000/hotel", {
    params: { area_id: areaId },
  });
  const responseData = JSON.parse(JSON.stringify(response.data));
  return responseData as HotelResponse[];
};

export const getHotel = async (id: number): Promise<HotelResponse> => {
  const response = await axios.get(`http://localhost:8000/hotel/${id}`);
  const responseData = JSON.parse(JSON.stringify(response.data));
  return responseData as HotelResponse;
};

export const postHotel = async (
  request: HotelRequest
): Promise<HotelResponse> => {
  const response = await axios.post("http://localhost:8000/hotel", request);
  const responseData = JSON.parse(JSON.stringify(response.data));
  return responseData as HotelResponse;
};
