import { BusinessForm, FormOption } from "./onsen/businessForm";
import { ChemicalOption } from "./onsen/chemical";
import { ChemicalTagOption } from "./onsen/chemicalTagModel";
import { Liquid, LiquidValueOption } from "./onsen/liquid";
import {
  OsmoticPressure,
  OsmoticPressureOption,
} from "./onsen/osmoticPressure";
import {
  Temperature,
  TemperatureOption as TemperatureOption,
} from "./onsen/temperature";

export type OnsenEntityParameter = {
  id: number;
  name: string;
  generatedSpringQuality: string | undefined;
  userSpringQuality: string;
  chemicals: ChemicalOption[];
  liquid: LiquidValueOption | undefined | null;
  osmoticPressure: OsmoticPressureOption | undefined | null;
  temperature: TemperatureOption | undefined | null;
  form: FormOption;
  isDayUse: boolean;
  url: string;
  description: string;
};

export class OnsenEntity {
  readonly id: number;
  readonly name: string;
  _generatedSpringQuality: string | undefined;
  _userSpringQuality: string;
  _chemicals: ChemicalOption[];
  _liquid: Liquid | undefined;
  _osmoticPressure: OsmoticPressure | undefined;
  _temperture: Temperature | undefined;
  _bussinessForm: BusinessForm;
  readonly isDayUse: boolean;
  readonly url: string;
  readonly description: string;

  constructor({
    id,
    name,
    generatedSpringQuality,
    userSpringQuality,
    chemicals,
    liquid,
    osmoticPressure,
    temperature,
    form,
    isDayUse,
    url,
    description,
  }: OnsenEntityParameter) {
    this.id = id;
    this.name = name;
    this._generatedSpringQuality = generatedSpringQuality;
    this._userSpringQuality = userSpringQuality;
    this._chemicals = chemicals;
    this._liquid = liquid != null ? new Liquid(liquid) : undefined;
    this._osmoticPressure =
      osmoticPressure != null
        ? new OsmoticPressure(osmoticPressure)
        : undefined;
    this._temperture =
      temperature != null ? new Temperature(temperature) : undefined;
    this._bussinessForm = new BusinessForm(form);
    this.isDayUse = isDayUse;
    this.url = url;
    this.description = description;
  }

  get chemicals(): ChemicalOption[] {
    return this._chemicals;
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
  get temperature(): TemperatureOption | undefined {
    return this._temperture?.value ?? undefined;
  }
  set temperature(value: TemperatureOption | undefined) {
    this._temperture = value !== undefined ? new Temperature(value) : undefined;
  }
  get generatedSprintQuality(): string | undefined {
    return this._generatedSpringQuality;
  }
  get userSpringQuality(): string {
    return this._userSpringQuality;
  }
  set userSpringQuality(value: string) {
    this._userSpringQuality = value;
  }

  getQualityText(): string {
    const altText =
      this._userSpringQuality !== "" ? `(${this._userSpringQuality})` : "";
    const separatedText =
      this._userSpringQuality !== "" &&
      this._generatedSpringQuality !== undefined
        ? " "
        : "";
    return `${this._generatedSpringQuality ?? ""}${separatedText}${altText}`;
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

  getChemicalTags(): ChemicalTagOption[] {
    if (this._chemicals.length === 0) {
      return ["Simple"];
    }
    return this._chemicals.map((c) => c);
  }
}
