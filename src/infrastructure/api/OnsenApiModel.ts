import {
  Chemical,
  FormOption,
  LiquidValueOption,
  OnsenModel,
  OsmoticPressureOption,
} from "../../share/onsen";
import { httpGet, httpPost, httpPut } from "./ApiClient";

export type OnsenResponse = {
  id: number;
  quality?: {
    name: string;
    chemicals: Chemical[];
  };
} & OnsenModel;

export type OnsenRequest = {
  name: string;
  springQuality: string;
  chemicals: {
    naIon: boolean;
    caIon: boolean;
    mgIon: boolean;
    clIon: boolean;
    hco3Ion: boolean;
    so4Ion: boolean;
    co2Ion: boolean;
    feIon: boolean;
    hIon: boolean;
    iIon: boolean;
    s: boolean;
    rn: boolean;
  } | null;
  liquid: LiquidValueOption | null;
  osmoticPressure: OsmoticPressureOption | null;
  form: FormOption;
  isDayUse: boolean | undefined;
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

export const putOnsen = async (
  id: number,
  request: OnsenRequest
): Promise<void> => {
  return await httpPut(`/onsen/${id}`, request);
};

export const postOnsen = async (
  request: OnsenRequest
): Promise<OnsenResponse> => {
  return await httpPost(`/onsen`, request);
};
