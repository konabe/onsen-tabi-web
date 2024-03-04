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

  getImageColor(): string {
    const colorDictionary: Record<ChemicalTagOption, string> = {
      NaIon: "#007bff",
      CaIon: "#28a745",
      MgIon: "#17a2b8",
      ClIon: "#ffc107",
      HCO3Ion: "#dc3545",
      SO4Ion: "#6610f2",
      CO2: "#6f42c1",
      FeIon: "#e83e8c",
      HIon: "#20c997",
      IIon: "#17a2b8",
      S: "#343a40",
      Rn: "#6c7500",
      Simple: "#6c757d",
    };
    return colorDictionary[this._value];
  }

  equals(vo: ChemicalTagModel): boolean {
    return this._value === vo.value;
  }

  copy(): ChemicalTagModel {
    return new ChemicalTagModel(this._value);
  }
}
