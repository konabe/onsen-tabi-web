import { ValueObject } from "../../ddd";
import { Chemical, ChemicalOption } from "./chemical";

export type ChemicalTagOption = ChemicalOption | "Simple";

export class ChemicalTagModel extends ValueObject implements OmittableText {
  constructor(private readonly _value: ChemicalTagOption) {
    super();
  }

  get value(): ChemicalTagOption {
    return this._value;
  }

  getText(): string {
    if (this._value === "Simple") {
      return "単純温泉";
    }
    return new Chemical(this._value).getText();
  }

  getOmittedText(): string {
    if (this._value === "Simple") {
      return "単";
    }
    return new Chemical(this._value).getOmittedText();
  }

  equals(vo: ChemicalTagModel): boolean {
    return this._value === vo.value;
  }

  copy(): ChemicalTagModel {
    return new ChemicalTagModel(this._value);
  }
}
