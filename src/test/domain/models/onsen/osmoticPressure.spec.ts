import { describe, expect, it } from "vitest";
import { OsmoticPressure } from "../../../../domain/models/onsen/osmoticPressure";

describe("OsmoticPressure", () => {
  describe("#value", () => {
    it("should return the value", () => {
      const osmoticPressure = new OsmoticPressure("isotonic");
      expect(osmoticPressure.value).toBe("isotonic");
    });
  });

  describe("#getText", () => {
    it.each`
      value           | expected
      ${"hypotonic"}  | ${"低張性"}
      ${"isotonic"}   | ${"等張性"}
      ${"hypertonic"} | ${"高張性"}
    `("should return $expected", ({ value, expected }) => {
      const osmoticPressure = new OsmoticPressure(value);
      expect(osmoticPressure.getText()).toBe(expected);
    });
  });

  describe("#getOmittedText", () => {
    it.each`
      value           | expected
      ${"hypotonic"}  | ${"低"}
      ${"isotonic"}   | ${"等"}
      ${"hypertonic"} | ${"高"}
    `("should return $expected", ({ value, expected }) => {
      const osmoticPressure = new OsmoticPressure(value);
      expect(osmoticPressure.getOmittedText()).toBe(expected);
    });
  });

  describe("#equals", () => {
    it("should return true", () => {
      const osmoticPressure1 = new OsmoticPressure("isotonic");
      const osmoticPressure2 = new OsmoticPressure("isotonic");
      expect(osmoticPressure1.equals(osmoticPressure2)).toBe(true);
    });

    it("should return false", () => {
      const osmoticPressure1 = new OsmoticPressure("isotonic");
      const osmoticPressure2 = new OsmoticPressure("hypotonic");
      expect(osmoticPressure1.equals(osmoticPressure2)).toBe(false);
    });
  });

  describe("#copy", () => {
    it("should return a copied instance", () => {
      const osmoticPressure = new OsmoticPressure("isotonic");
      const copied = osmoticPressure.copy();
      expect(copied.equals(osmoticPressure)).toBe(true);
      expect(copied).not.toBe(osmoticPressure);
    });
  });
});
