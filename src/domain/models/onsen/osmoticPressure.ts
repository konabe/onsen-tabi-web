import { ValueObject } from "../../ddd";

export type OsmoticPressureOption = "hypotonic" | "isotonic" | "hypertonic";

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

  equals(vo: OsmoticPressure): boolean {
    return this._value === vo._value;
  }

  copy(): OsmoticPressure {
    return new OsmoticPressure(this._value);
  }
}
