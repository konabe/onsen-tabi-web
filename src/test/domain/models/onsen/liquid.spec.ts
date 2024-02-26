import { describe, expect, it } from "vitest";
import { Liquid } from "../../../../domain/models/onsen/liquid";

describe("Liquid", () => {
  describe("#value", () => {
    it("should return the value", () => {
      const liquid = new Liquid("mildly_alkaline");
      expect(liquid.value).toBe("mildly_alkaline");
    });
  });

  describe("#getText", () => {
    it.each`
      value                | expected
      ${"acidic"}          | ${"酸性"}
      ${"mildly_acidic"}   | ${"弱酸性"}
      ${"neutral"}         | ${"中性"}
      ${"mildly_alkaline"} | ${"弱アルカリ性"}
      ${"alkaline"}        | ${"アルカリ性"}
    `("should return $expected", ({ value, expected }) => {
      const liquid = new Liquid(value);
      expect(liquid.getText()).toBe(expected);
    });
  });

  describe("#getTextWithInstruction", () => {
    it.each`
      value                | expected
      ${"acidic"}          | ${"酸性(pH3未満)"}
      ${"mildly_acidic"}   | ${"弱酸性(pH3以上～6未満)"}
      ${"neutral"}         | ${"中性(pH6以上～7.5未満)"}
      ${"mildly_alkaline"} | ${"弱アルカリ性(pH7.5以上～8.5未満)"}
      ${"alkaline"}        | ${"アルカリ性(pH8.5以上)"}
    `("should return $expected", ({ value, expected }) => {
      const liquid = new Liquid(value);
      expect(liquid.getTextWithInstruction()).toBe(expected);
    });
  });

  describe("#getOmittedText", () => {
    it.each`
      value                | expected
      ${"acidic"}          | ${"酸"}
      ${"mildly_acidic"}   | ${"弱酸"}
      ${"neutral"}         | ${"中"}
      ${"mildly_alkaline"} | ${"弱ア"}
      ${"alkaline"}        | ${"ア"}
    `("should return $expected", ({ value, expected }) => {
      const liquid = new Liquid(value);
      expect(liquid.getOmittedText()).toBe(expected);
    });
  });

  describe("#equals", () => {
    it("should return true", () => {
      const liquid1 = new Liquid("mildly_alkaline");
      const liquid2 = new Liquid("mildly_alkaline");
      expect(liquid1.equals(liquid2)).toBe(true);
    });

    it("should return false", () => {
      const liquid1 = new Liquid("mildly_alkaline");
      const liquid2 = new Liquid("alkaline");
      expect(liquid1.equals(liquid2)).toBe(false);
    });
  });

  describe("#copy", () => {
    it("should return a copied instance", () => {
      const liquid = new Liquid("mildly_alkaline");
      const copied = liquid.copy();
      expect(copied.equals(liquid)).toBe(true);
      expect(copied).not.toBe(liquid);
    });
  });
});
