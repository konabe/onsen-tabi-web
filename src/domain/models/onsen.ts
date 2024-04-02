import { AreaName } from "./area/areaName";
import { BusinessForm, FormOption } from "./onsen/businessForm";
import { ChemicalOption } from "./onsen/chemical";
import { ChemicalTagOption } from "./onsen/chemicalTagModel";
import { Liquid, LiquidValueOption } from "./onsen/liquid";
import {
  OsmoticPressure,
  OsmoticPressureOption,
} from "./onsen/osmoticPressure";
import { Temperature, TemperatureOption } from "./onsen/temperature";

export type OnsenEntityParameter = {
  id: number;
  name: string;
  chemicals: ChemicalOption[];
  generatedSpringQuality: string | undefined;
  otherSpringQuality: string;
  liquid: LiquidValueOption | undefined | null;
  osmoticPressure: OsmoticPressureOption | undefined | null;
  temperature: TemperatureOption | undefined | null;
  form: FormOption;
  isDayUse: boolean;
  url: string;
  imgURL: string | null;
  description: string;
  area:
    | {
        id: number;
        name: string;
      }
    | undefined
    | null;
};

export class OnsenEntity {
  readonly id: number;
  readonly name: string;
  _generatedSpringQuality: string | undefined;
  _otherSpringQuality: string;
  _chemicals: ChemicalOption[];
  _liquid: Liquid | undefined;
  _osmoticPressure: OsmoticPressure | undefined;
  _temperture: Temperature | undefined;
  _bussinessForm: BusinessForm;
  readonly isDayUse: boolean;
  readonly url: string;
  _imgURL: string | undefined;
  readonly description: string;
  _area:
    | {
        id: number;
        name: AreaName;
      }
    | undefined;

  constructor({
    id,
    name,
    generatedSpringQuality,
    otherSpringQuality,
    chemicals,
    liquid,
    osmoticPressure,
    temperature,
    form,
    isDayUse,
    url,
    imgURL,
    description,
    area,
  }: OnsenEntityParameter) {
    this.id = id;
    this.name = name;
    this._generatedSpringQuality = generatedSpringQuality;
    this._otherSpringQuality = otherSpringQuality;
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
    this._imgURL = imgURL ?? undefined;
    this.description = description;
    this._area =
      area != undefined
        ? { id: area.id, name: new AreaName(area.name) }
        : undefined;
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
  get otherSpringQuality(): string {
    return this._otherSpringQuality;
  }
  set otherSpringQuality(value: string) {
    this._otherSpringQuality = value;
  }
  get imgURL(): string | undefined {
    return this._imgURL;
  }
  get area(): { id: number; name: string } | undefined {
    return this._area !== undefined
      ? { id: this._area.id, name: this._area.name.value }
      : undefined;
  }

  getQualityText(): string {
    const altText =
      this._otherSpringQuality !== "" ? `(${this._otherSpringQuality})` : "";
    const separatedText =
      this._otherSpringQuality !== "" &&
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

  getTemperatureText(): string | undefined {
    return this._temperture?.getText() ?? undefined;
  }

  getSubText(): string {
    return `(${this.getOsmoticPressureText() ?? "？"}・${
      this.getLiquidText() ?? "？"
    }・${this.getTemperatureText() ?? "？"})`;
  }

  getChemicalTags(): ChemicalTagOption[] {
    if (this._chemicals.length === 0) {
      return ["Simple"];
    }
    let chemicals = this._chemicals.map((c) => c);
    return [...chemicals];
  }

  displayingAreaName(): string | undefined {
    return this._area?.name.displayingName();
  }
}
