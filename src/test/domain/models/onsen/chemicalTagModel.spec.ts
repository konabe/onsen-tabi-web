import { ChemicalTagModel } from "../../../../domain/models/onsen/chemicalTagModel";

describe("ChemicalTagModel", () => {
  describe("#value", () => {
    it("should return the value", () => {
      const chemical = new ChemicalTagModel("Simple");
      expect(chemical.value).toBe("Simple");
    });
  });

  describe("#getText", () => {
    it.each`
      value           | expected
      ${"NaIon"}      | ${"ナトリウムイオン"}
      ${"CaIon"}      | ${"カルシウムイオン"}
      ${"MgIon"}      | ${"マグネシウムイオン"}
      ${"ClIon"}      | ${"塩化物イオン"}
      ${"HCO3Ion"}    | ${"炭酸水素イオン"}
      ${"SO4Ion"}     | ${"硫酸イオン"}
      ${"CO2"}        | ${"二酸化炭素"}
      ${"FeIon"}      | ${"鉄イオン"}
      ${"AlIon"}      | ${"アルミニウムイオン"}
      ${"CuIon"}      | ${"銅イオン"}
      ${"HIon"}       | ${"水素イオン"}
      ${"IIon"}       | ${"ヨウ素イオン"}
      ${"S"}          | ${"硫黄"}
      ${"Rn"}         | ${"ラドン"}
      ${"Simple"}     | ${"単純温泉"}
      ${"WeakRn"}     | ${"(弱放射能泉)"}
      ${"StrongNaCl"} | ${"(強塩化物泉)"}
      ${"FeIon2"}     | ${"(鉄イオン(Ⅱ))"}
      ${"FeIon3"}     | ${"(鉄イオン(Ⅲ))"}
    `("should return $expected", ({ value, expected }) => {
      const chemical = new ChemicalTagModel(value);
      expect(chemical.getText()).toBe(expected);
    });
  });

  describe("#getOmittedText", () => {
    it.each`
      value           | expected
      ${"NaIon"}      | ${"ナ"}
      ${"CaIon"}      | ${"カ"}
      ${"MgIon"}      | ${"マ"}
      ${"ClIon"}      | ${"塩"}
      ${"HCO3Ion"}    | ${"炭水"}
      ${"SO4Ion"}     | ${"硫"}
      ${"CO2"}        | ${"二酸"}
      ${"FeIon"}      | ${"鉄"}
      ${"AlIon"}      | ${"ア"}
      ${"CuIon"}      | ${"銅"}
      ${"HIon"}       | ${"酸性"}
      ${"IIon"}       | ${"ヨ"}
      ${"S"}          | ${"硫黄"}
      ${"Rn"}         | ${"放射"}
      ${"Simple"}     | ${"単"}
      ${"WeakRn"}     | ${"弱放射"}
      ${"StrongNaCl"} | ${"強塩"}
      ${"FeIon2"}     | ${"鉄(Ⅱ)"}
      ${"FeIon3"}     | ${"鉄(Ⅲ)"}
    `("should return $expected", ({ value, expected }) => {
      const chemical = new ChemicalTagModel(value);
      expect(chemical.getOmittedText()).toBe(expected);
    });
  });

  describe("#getImageColor", () => {
    it.each`
      value           | expected
      ${"NaIon"}      | ${"#915c8b"}
      ${"CaIon"}      | ${"#00a497"}
      ${"MgIon"}      | ${"#aacf53"}
      ${"ClIon"}      | ${"#47885e"}
      ${"HCO3Ion"}    | ${"#afafb0"}
      ${"SO4Ion"}     | ${"#ebd842"}
      ${"CO2"}        | ${"#595857"}
      ${"FeIon"}      | ${"#f8b862"}
      ${"AlIon"}      | ${"#d6c6af"}
      ${"CuIon"}      | ${"#c39143"}
      ${"HIon"}       | ${"#c1e4e9"}
      ${"IIon"}       | ${"#bbbcde"}
      ${"S"}          | ${"#ffdb4f"}
      ${"Rn"}         | ${"#5b7e91"}
      ${"Simple"}     | ${"#2b2b2b"}
      ${"WeakRn"}     | ${"#6c848d"}
      ${"StrongNaCl"} | ${"#727171"}
      ${"FeIon2"}     | ${"#f8b862"}
      ${"FeIon3"}     | ${"#f8b862"}
    `("should return $expected", ({ value, expected }) => {
      const chemical = new ChemicalTagModel(value);
      expect(chemical.getImageColor()).toBe(expected);
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
