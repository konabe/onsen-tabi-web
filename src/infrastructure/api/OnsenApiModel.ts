import axios from "axios";

export type OnsenResponse = {
  id: number;
  name: string;
  sprintQuality: string;
  liquid: string | null;
  ostomicPressure: string | null;
  form: string;
  url: string;
  description: string;
};

export type PutOnsenDescriptionRequest = {
  description: string;
};

export type OnsenRequest = {
  name: string;
  sprintQuality: string;
  liquid: string | null;
  ostomicPressure: string | null;
  form: string;
  url: string;
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

export const putOnsenDescription = async (
  id: number,
  description: string
): Promise<void> => {
  const request: PutOnsenDescriptionRequest = { description };
  await axios.put(`http://localhost:8000/onsen/${id}/description`, request);
};

export const postOnsen = async (
  request: OnsenRequest
): Promise<OnsenResponse> => {
  const response = await axios.post("http://localhost:8000/onsen", request);
  const responseData = JSON.parse(JSON.stringify(response.data));
  return responseData as OnsenResponse;
};
