import axios from "axios";

export type HotelResponse = {
  name: string;
  hasWashitsu: boolean;
};

export const getHotels = async (): Promise<HotelResponse[]> => {
  const response = await axios.get("http://localhost:8000/hotel");
  const responseData = JSON.parse(JSON.stringify(response.data));
  return responseData as HotelResponse[];
};
