import { ValueObject } from "../../ddd";

export type TemperatureOption = "hot" | "normal" | "cool" | "cold";

export class Temperature extends ValueObject implements OmittableText {
  constructor(private readonly _value: TemperatureOption) {
    super();
  }

  get value(): TemperatureOption {
    return this._value;
  }

  getText(): string {
    switch (this._value) {
      case "hot":
        return "高温泉";
      case "normal":
        return "温泉";
      case "cool":
        return "低温泉";
      case "cold":
        return "冷鉱泉";
    }
  }

  getOmittedText(): string {
    switch (this._value) {
      case "hot":
        return "高";
      case "normal":
        return "温";
      case "cool":
        return "低";
      case "cold":
        return "冷";
    }
  }

  getTextWithInstruction(): string {
    return `${this.getText()}(${this.getIntervalText()})`;
  }

  equals(vo: Temperature): boolean {
    return this._value === vo._value;
  }

  copy(): Temperature {
    return new Temperature(this._value);
  }

  private getInterval(): [number | undefined, number | undefined] {
    switch (this._value) {
      case "hot":
        return [42, undefined];
      case "normal":
        return [34, 42];
      case "cool":
        return [25, 34];
      case "cold":
        return [undefined, 25];
    }
  }

  private getIntervalText(): string {
    const [min, max] = this.getInterval();
    if (min === undefined) {
      return `${max}℃未満`;
    }
    if (max === undefined) {
      return `${min}℃以上`;
    }
    return `${min}℃以上〜${max}℃未満`;
  }
}
