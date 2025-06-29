import { OmittableText } from "../../abstract/omittableText";
import { ValueObject } from "../../ddd";

export const OsmoticPressureOptions = [
  "hypotonic",
  "isotonic",
  "hypertonic",
] as const;
export type OsmoticPressureOption = (typeof OsmoticPressureOptions)[number];

export class OsmoticPressure extends ValueObject implements OmittableText {
  constructor(private readonly _value: OsmoticPressureOption) {
    super();
  }

  get value(): OsmoticPressureOption {
    return this._value;
  }

  getText(): string {
    switch (this._value) {
      case "hypotonic":
        return "低張性";
      case "isotonic":
        return "等張性";
      case "hypertonic":
        return "高張性";
    }
  }

  getOmittedText(): string | undefined {
    switch (this._value) {
      case "hypotonic":
        return "低";
      case "isotonic":
        return "等";
      case "hypertonic":
        return "高";
    }
  }

  getTextWithInstruction(): string {
    return `${this.getText()}(溶存物質総量${this.getMassOfDissolvedIngredientsIntervalText()}, 凝固点${this.getFreezingPointIntervalText()})`;
  }

  equals(vo: OsmoticPressure): boolean {
    return this._value === vo._value;
  }

  copy(): OsmoticPressure {
    return new OsmoticPressure(this._value);
  }

  private getMassOfDissolvedIngredientsInterval(): [
    number | undefined,
    number | undefined,
  ] {
    switch (this._value) {
      case "hypotonic":
        return [undefined, 8];
      case "isotonic":
        return [8, 10];
      case "hypertonic":
        return [10, undefined];
    }
  }

  private getMassOfDissolvedIngredientsIntervalText(): string {
    const [min, max] = this.getMassOfDissolvedIngredientsInterval();
    if (min === undefined) {
      return `${max}g/kg未満`;
    }
    if (max === undefined) {
      return `${min}g/kg以上`;
    }
    return `${min}g/kg以上${max}g/kg未満`;
  }

  private getFreezingPointInterval(): [number | undefined, number | undefined] {
    switch (this._value) {
      case "hypotonic":
        return [-0.55, undefined];
      case "isotonic":
        return [-0.58, -0.55];
      case "hypertonic":
        return [undefined, -0.58];
    }
  }

  private getFreezingPointIntervalText(): string {
    const [min, max] = this.getFreezingPointInterval();
    if (min === undefined) {
      return `${max}℃未満`;
    }
    if (max === undefined) {
      return `${min}℃以上`;
    }
    return `${min}℃以上${max}℃未満`;
  }
}
