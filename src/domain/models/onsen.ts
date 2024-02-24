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
export const chemicalDictionaryOmitted: Record<Chemical, string> = {
  NaIon: "ナ",
  CaIon: "カ",
  MgIon: "マ",
  ClIon: "塩",
  HCO3Ion: "炭水",
  SO4Ion: "硫",
  CO2: "二酸",
  FeIon: "鉄",
  HIon: "酸性",
  IIon: "ヨ",
  S: "硫黄",
  Rn: "放射",
};

type OnsenEntityParameter = {
  id: number;
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

export class OnsenEntity {
  readonly id: number;
  readonly name: string;
  readonly springQuality: string;
  readonly springQualityUser: string;
  readonly chemicals: Chemical[];
  readonly liquid: LiquidValueOption | null;
  readonly osmoticPressure: OsmoticPressureOption | null;
  readonly form: FormOption;
  readonly isDayUse: boolean | undefined;
  readonly url: string;
  readonly description: string;

  constructor({
    id,
    name,
    springQuality,
    springQualityUser,
    chemicals,
    liquid,
    osmoticPressure,
    form,
    isDayUse,
    url,
    description,
  }: OnsenEntityParameter) {
    this.id = id;
    this.name = name;
    this.springQuality = springQuality;
    this.springQualityUser = springQualityUser;
    this.chemicals = chemicals;
    this.liquid = liquid;
    this.osmoticPressure = osmoticPressure;
    this.form = form;
    this.isDayUse = isDayUse;
    this.url = url;
    this.description = description;
  }

  // 内風呂、露天風呂とは区別する
  getFormText() {
    switch (this.form) {
      case "sotoyu":
        return "外湯";
      case "uchiyu":
        return "内湯";
    }
  }

  getLiquidText(): string | undefined {
    if (this.liquid === null) {
      return undefined;
    }
    switch (this.liquid) {
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
  }

  getOsmoticPressureText(): string | undefined {
    if (this.osmoticPressure === null) {
      return undefined;
    }
    switch (this.osmoticPressure) {
      case "hypotonic":
        return "低張性";
      case "isotonic":
        return "等張性";
      case "hypertonic":
        return "高張性";
    }
  }

  getSubText(): string {
    return `(${this.getOsmoticPressureText() ?? "？"}・${
      this.getLiquidText() ?? "？"
    }${/*ここに温度情報*/ ""})`;
  }
}
