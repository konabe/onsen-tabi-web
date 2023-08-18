import axios from "axios";

export type LiquidValueOption =
  | "acidic"
  | "mildly_acidic"
  | "neutral"
  | "mildly_alkaline"
  | "alkaline";
export type OsmoticPressureOption = "hypotonic" | "isotonic" | "hypertonic";
export type FormOption = "uchiyu" | "sotoyu";

export type OnsenResponse = {
  id: number;
  name: string;
  springQuality: string;
  liquid: LiquidValueOption | null;
  ostomicPressure: OsmoticPressureOption | null;
  form: FormOption;
  url: string;
  description: string;
};

export type PutOnsenDescriptionRequest = {
  description: string;
};

export type OnsenRequest = {
  name: string;
  springQuality: string;
  liquid: string | null;
  ostomicPressure: string | null;
  form: string;
  url: string;
  description: string;
};

export const getLiquidText = (option: LiquidValueOption) => {
  switch (option) {
    case "acidic":
      return "酸性";
    case "mildly_acidic":
      return "弱酸性";
    case "neutral":
      return "中性";
    case "mildly_alkaline":
      return "弱アルカリ性";
    case "alkaline":
      return "アルカリ性";
  }
};

export const getOstomicPressureText = (option: OsmoticPressureOption) => {
  switch (option) {
    case "hypotonic":
      return "低張性";
    case "isotonic":
      return "等張性";
    case "hypertonic":
      return "高張性";
  }
};

// 内風呂、露天風呂とは区別する
export const getFormText = (option: FormOption) => {
  switch (option) {
    case "sotoyu":
      return "外湯";
    case "uchiyu":
      return "内湯";
  }
};

export const getOnsens = async (
  areaId?: number,
  hotelId?: number
): Promise<OnsenResponse[]> => {
  const response = await axios.get("http://localhost:8000/onsen", {
    params: { area_id: areaId, hotel_id: hotelId },
  });
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
