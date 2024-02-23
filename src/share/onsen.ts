export type LiquidValueOption =
  | "acidic"
  | "mildly_acidic"
  | "neutral"
  | "mildly_alkaline"
  | "alkaline";
export type OsmoticPressureOption = "hypotonic" | "isotonic" | "hypertonic";
export type FormOption = "uchiyu" | "sotoyu";
const chemicals = [
  "NaIon",
  "NaIon",
  "CaIon",
  "MgIon",
  "ClIon",
  "HCO3Ion",
  "SO4Ion",
  "CO2",
  "FeIon",
  "HIon",
  "IIon",
  "S",
  "Rn",
] as const;
export type Chemical = (typeof chemicals)[number];
export const chemicalDictionary: Record<Chemical, string> = {
  NaIon: "ナトリウムイオン",
  CaIon: "カルシウムイオン",
  MgIon: "マグネシウムイオン",
  ClIon: "塩化物イオン",
  HCO3Ion: "炭酸水素イオン",
  SO4Ion: "硫酸イオン",
  CO2: "二酸化炭素",
  FeIon: "鉄イオン",
  HIon: "水素イオン",
  IIon: "ヨウ素イオン",
  S: "硫黄",
  Rn: "ラドン",
};

export type OnsenModel = {
  name: string;
  springQuality: string;
  springQualityUser: string;
  chemicals: Chemical[];
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
