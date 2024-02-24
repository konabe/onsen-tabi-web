import { BusinessForm, FormOption } from "./onsen/businessForm";
import { Liquid, LiquidValueOption } from "./onsen/liquid";
import {
  OsmoticPressure,
  OsmoticPressureOption,
} from "./onsen/osmoticPressure";

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

export type OnsenEntityParameter = {
  id: number;
  name: string;
  springQuality: string;
  springQualityUser: string;
  chemicals: Chemical[];
  liquid: LiquidValueOption | undefined | null;
  osmoticPressure: OsmoticPressureOption | undefined | null;
  form: FormOption;
  isDayUse: boolean;
  url: string;
  description: string;
};

export class OnsenEntity {
  readonly id: number;
  readonly name: string;
  readonly springQuality: string;
  readonly springQualityUser: string;
  readonly chemicals: Chemical[];
  _liquid: Liquid | undefined;
  _osmoticPressure: OsmoticPressure | undefined;
  _bussinessForm: BusinessForm;
  readonly isDayUse: boolean;
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
    this._liquid = liquid != null ? new Liquid(liquid) : undefined;
    this._osmoticPressure =
      osmoticPressure != null
        ? new OsmoticPressure(osmoticPressure)
        : undefined;
    this._bussinessForm = new BusinessForm(form);
    this.isDayUse = isDayUse;
    this.url = url;
    this.description = description;
  }

  get liquid(): LiquidValueOption | undefined {
    return this._liquid?.value ?? undefined;
  }
  set liquid(value: LiquidValueOption | undefined) {
    this._liquid = value !== undefined ? new Liquid(value) : undefined;
  }
  get form(): FormOption {
    return this._bussinessForm.value;
  }
  set form(value: FormOption) {
    this._bussinessForm = new BusinessForm(value);
  }
  get osmoticPressure(): OsmoticPressureOption | undefined {
    return this._osmoticPressure?.value ?? undefined;
  }
  set osmoticPressure(value: OsmoticPressureOption | undefined) {
    this._osmoticPressure =
      value !== undefined ? new OsmoticPressure(value) : undefined;
  }

  getFormText(): string {
    return this._bussinessForm.getText();
  }

  getLiquidText(): string | undefined {
    return this._liquid?.getText() ?? undefined;
  }

  getOsmoticPressureText(): string | undefined {
    return this._osmoticPressure?.getText() ?? undefined;
  }

  getSubText(): string {
    return `(${this.getOsmoticPressureText() ?? "？"}・${
      this.getLiquidText() ?? "？"
    }${/*ここに温度情報*/ ""})`;
  }
}
