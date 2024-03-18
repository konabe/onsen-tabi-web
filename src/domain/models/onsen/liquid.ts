import { ValueObject } from "../../ddd";

export const LiquidValueOptions = [
  "acidic",
  "mildly_acidic",
  "neutral",
  "mildly_alkaline",
  "alkaline",
] as const;
export type LiquidValueOption = (typeof LiquidValueOptions)[number];

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

  getTextWithInstruction(): string {
    return `${this.getText()}(${this.getPhIntervalText()})`;
  }

  equals(vo: Liquid): boolean {
    return this._value === vo._value;
  }

  copy(): Liquid {
    return new Liquid(this._value);
  }

  private getPhInterval(): [number | undefined, number | undefined] {
    switch (this._value) {
      case "acidic":
        return [undefined, 3];
      case "mildly_acidic":
        return [3, 6];
      case "neutral":
        return [6, 7.5];
      case "mildly_alkaline":
        return [7.5, 8.5];
      case "alkaline":
        return [8.5, undefined];
    }
  }

  private getPhIntervalText(): string {
    const [min, max] = this.getPhInterval();
    if (min === undefined) {
      return `pH${max}未満`;
    }
    if (max === undefined) {
      return `pH${min}以上`;
    }
    return `pH${min}以上～${max}未満`;
  }
}
