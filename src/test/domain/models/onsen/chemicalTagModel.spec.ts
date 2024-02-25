import { describe, expect, it } from "vitest";
import { ChemicalTagModel } from "../../../../domain/models/onsen/chemicalTagModel";

describe("Chemical", () => {
  describe("#value", () => {
    it("should return the value", () => {
      const chemical = new ChemicalTagModel("Simple");
      expect(chemical.value).toBe("Simple");
    });
  });

  describe("#getText", () => {
    it.each`
      value        | expected
      ${"NaIon"}   | ${"ナトリウムイオン"}
      ${"CaIon"}   | ${"カルシウムイオン"}
      ${"MgIon"}   | ${"マグネシウムイオン"}
      ${"ClIon"}   | ${"塩化物イオン"}
      ${"HCO3Ion"} | ${"炭酸水素イオン"}
      ${"SO4Ion"}  | ${"硫酸イオン"}
      ${"CO2"}     | ${"二酸化炭素"}
      ${"FeIon"}   | ${"鉄イオン"}
      ${"HIon"}    | ${"水素イオン"}
      ${"IIon"}    | ${"ヨウ素イオン"}
      ${"S"}       | ${"硫黄"}
      ${"Rn"}      | ${"ラドン"}
      ${"Simple"}  | ${"単純温泉"}
    `("should return $expected", ({ value, expected }) => {
      const chemical = new ChemicalTagModel(value);
      expect(chemical.getText()).toBe(expected);
    });
  });

  describe("#getOmittedText", () => {
    it.each`
      value        | expected
      ${"NaIon"}   | ${"ナ"}
      ${"CaIon"}   | ${"カ"}
      ${"MgIon"}   | ${"マ"}
      ${"ClIon"}   | ${"塩"}
      ${"HCO3Ion"} | ${"炭水"}
      ${"SO4Ion"}  | ${"硫"}
      ${"CO2"}     | ${"二酸"}
      ${"FeIon"}   | ${"鉄"}
      ${"HIon"}    | ${"酸性"}
      ${"IIon"}    | ${"ヨ"}
      ${"S"}       | ${"硫黄"}
      ${"Rn"}      | ${"放射"}
      ${"Simple"}  | ${"単"}
    `("should return $expected", ({ value, expected }) => {
      const chemical = new ChemicalTagModel(value);
      expect(chemical.getOmittedText()).toBe(expected);
    });
  });

  describe("#equals", () => {
    it("should return true", () => {
      const chemical1 = new ChemicalTagModel("NaIon");
      const chemical2 = new ChemicalTagModel("NaIon");
      expect(chemical1.equals(chemical2)).toBe(true);
    });

    it("should return false", () => {
      const chemical1 = new ChemicalTagModel("NaIon");
      const chemical2 = new ChemicalTagModel("CaIon");
      expect(chemical1.equals(chemical2)).toBe(false);
    });
  });

  describe("#copy", () => {
    it("should return a copied instance", () => {
      const chemical = new ChemicalTagModel("NaIon");
      const copied = chemical.copy();
      expect(copied.equals(chemical)).toBe(true);
      expect(copied).not.toBe(chemical);
    });
  });
});
