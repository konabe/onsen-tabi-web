import { httpGet, httpPost, httpPut } from "./ApiClient";

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
  osmoticPressure: OsmoticPressureOption | null;
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
  osmoticPressure: string | null;
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

export const getOsmoticPressureText = (option: OsmoticPressureOption) => {
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
  return await httpGet("/onsen", { area_id: areaId, hotel_id: hotelId });
};

export const getOnsen = async (id: number): Promise<OnsenResponse> => {
  return await httpGet(`/onsen/${id}`);
};

export const putOnsenDescription = async (
  id: number,
  description: string
): Promise<void> => {
  const request: PutOnsenDescriptionRequest = { description };
  return await httpPut(`/onsen/${id}/description`, request);
};

export const postOnsen = async (
  request: OnsenRequest
): Promise<OnsenResponse> => {
  return await httpPost(`/onsen`, request);
};
