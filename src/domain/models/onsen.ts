import { BusinessForm, FormOption } from "./onsen/businessForm";
import { ChemicalOption } from "./onsen/chemical";
import { Liquid, LiquidValueOption } from "./onsen/liquid";
import {
  OsmoticPressure,
  OsmoticPressureOption,
} from "./onsen/osmoticPressure";

export type OnsenEntityParameter = {
  id: number;
  name: string;
  springQuality: string;
  springQualityUser: string;
  chemicals: ChemicalOption[];
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
  readonly chemicals: ChemicalOption[];
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
