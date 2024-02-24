import { describe, expect, it } from "vitest";
import { BusinessForm } from "../../../../domain/models/onsen/businessForm";

describe("BussinessForm", () => {
  describe("#value", () => {
    it("should return the value", () => {
      const form = new BusinessForm("uchiyu");
      expect(form.value).toBe("uchiyu");
    });
  });

  describe("#getText", () => {
    it.each`
      value       | expected
      ${"uchiyu"} | ${"内湯"}
      ${"sotoyu"} | ${"外湯"}
    `("should return $expected", ({ value, expected }) => {
      const form = new BusinessForm(value);
      expect(form.getText()).toBe(expected);
    });
  });

  describe("#getOmittedText", () => {
    it.each`
      value       | expected
      ${"uchiyu"} | ${"内"}
      ${"sotoyu"} | ${"外"}
    `("should return $expected", ({ value, expected }) => {
      const form = new BusinessForm(value);
      expect(form.getOmittedText()).toBe(expected);
    });
  });

  describe("#equals", () => {
    it("should return true", () => {
      const form1 = new BusinessForm("uchiyu");
      const form2 = new BusinessForm("uchiyu");
      expect(form1.equals(form2)).toBe(true);
    });

    it("should return false", () => {
      const form1 = new BusinessForm("uchiyu");
      const form2 = new BusinessForm("sotoyu");
      expect(form1.equals(form2)).toBe(false);
    });
  });

  describe("#copy", () => {
    it("should return a copied instance", () => {
      const form = new BusinessForm("uchiyu");
      const copied = form.copy();
      expect(copied.equals(form)).toBe(true);
      expect(copied).not.toBe(form);
    });
  });
});
