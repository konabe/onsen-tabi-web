import { ValueObject } from "../../ddd";

export type LiquidValueOption =
  | "acidic"
  | "mildly_acidic"
  | "neutral"
  | "mildly_alkaline"
  | "alkaline";

export class Liquid extends ValueObject implements OmittableText {
  constructor(private readonly _value: LiquidValueOption) {
    super();
  }

  get value(): LiquidValueOption {
    return this._value;
  }

  getText(): string {
    switch (this._value) {
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

  getOmittedText(): string | undefined {
    switch (this._value) {
      case "acidic":
        return "酸";
      case "mildly_acidic":
        return "弱酸";
      case "neutral":
        return "中";
      case "mildly_alkaline":
        return "弱ア";
      case "alkaline":
        return "ア";
    }
  }

  equals(vo: Liquid): boolean {
    return this._value === vo._value;
  }

  copy(): Liquid {
    return new Liquid(this._value);
  }
}
