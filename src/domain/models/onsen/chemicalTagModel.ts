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
    // https://jmol.sourceforge.net/jscolors/
    // https://www.colordic.org/w
    const colorDictionary: Record<ChemicalTagOption, string> = {
      NaIon: "#915c8b",
      CaIon: "#00a497",
      StrongNaCl: "#727171",
      MgIon: "#aacf53",
      ClIon: "#47885e",
      HCO3Ion: "#afafb0",
      SO4Ion: "#ebd842",
      CO2: "#595857",
      FeIon: "#f8b862",
      AlIon: "#d6c6af",
      CuIon: "#c39143	",
      HIon: "#c1e4e9",
      IIon: "#bbbcde",
      S: "#ffdb4f",
      Rn: "#5b7e91",
      WeakRn: "#6c848d",
      Simple: "#2b2b2b",
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
