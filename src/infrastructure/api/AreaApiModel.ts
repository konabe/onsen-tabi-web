import axios from "axios";

export type AreaResponse = {
  id: number;
  name: string;
  prefecture: string;
  url: string;
};

export const getAreas = async (): Promise<AreaResponse[]> => {
  const response = await axios.get("http://localhost:8000/area");
  const responseData = JSON.parse(JSON.stringify(response.data));
  return responseData as AreaResponse[];
};

export const getArea = async (id: number): Promise<AreaResponse> => {
  const response = await axios.get(`http://localhost:8000/area/${id}`);
  const responseData = JSON.parse(JSON.stringify(response.data));
  return responseData as AreaResponse;
};
