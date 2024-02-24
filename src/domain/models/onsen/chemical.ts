import { ValueObject } from "../../ddd";

const chemicals = [
  "NaIon",
  "NaIon",
  "CaIon",
  "MgIon",
  "ClIon",
  "HCO3Ion",
  "SO4Ion",
  "CO2",
  "FeIon",
  "HIon",
  "IIon",
  "S",
  "Rn",
] as const;
export type ChemicalOption = (typeof chemicals)[number];

export class Chemical extends ValueObject implements OmittableText {
  constructor(private readonly _value: ChemicalOption) {
    super();
  }

  get value(): ChemicalOption {
    return this._value;
  }

  getText(): string {
    const chemicalDictionary: Record<ChemicalOption, string> = {
      NaIon: "ナトリウムイオン",
      CaIon: "カルシウムイオン",
      MgIon: "マグネシウムイオン",
      ClIon: "塩化物イオン",
      HCO3Ion: "炭酸水素イオン",
      SO4Ion: "硫酸イオン",
      CO2: "二酸化炭素",
      FeIon: "鉄イオン",
      HIon: "水素イオン",
      IIon: "ヨウ素イオン",
      S: "硫黄",
      Rn: "ラドン",
    };
    return chemicalDictionary[this._value];
  }

  getOmittedText(): string {
    const chemicalDictionaryOmitted: Record<ChemicalOption, string> = {
      NaIon: "ナ",
      CaIon: "カ",
      MgIon: "マ",
      ClIon: "塩",
      HCO3Ion: "炭水",
      SO4Ion: "硫",
      CO2: "二酸",
      FeIon: "鉄",
      HIon: "酸性",
      IIon: "ヨ",
      S: "硫黄",
      Rn: "放射",
    };
    return chemicalDictionaryOmitted[this._value];
  }

  equals(vo: Chemical): boolean {
    return this._value === vo.value;
  }

  copy(): Chemical {
    return new Chemical(this._value);
  }
}
