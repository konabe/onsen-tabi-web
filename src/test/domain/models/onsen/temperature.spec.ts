import { Temperature } from "../../../../domain/models/onsen/temperature";

describe("Temperature", () => {
  describe("#value", () => {
    it("should return the value", () => {
      const temperature = new Temperature("hot");
      expect(temperature.value).toBe("hot");
    });
  });

  describe("#getText", () => {
    it.each`
      value       | expected
      ${"hot"}    | ${"高温泉"}
      ${"normal"} | ${"温泉"}
      ${"cool"}   | ${"低温泉"}
      ${"cold"}   | ${"冷鉱泉"}
    `("returns $expected when value is $value", ({ value, expected }) => {
      const temperature = new Temperature(value);
      expect(temperature.getText()).toBe(expected);
    });
  });

  describe("#getOmittedText", () => {
    it.each`
      value       | expected
      ${"hot"}    | ${"高"}
      ${"normal"} | ${"温"}
      ${"cool"}   | ${"低"}
      ${"cold"}   | ${"冷"}
    `("returns $expected when value is $value", ({ value, expected }) => {
      const temperature = new Temperature(value);
      expect(temperature.getOmittedText()).toBe(expected);
    });
  });

  describe("#getTextWithInstruction", () => {
    it.each`
      value       | expected
      ${"hot"}    | ${"高温泉(42℃以上)"}
      ${"normal"} | ${"温泉(34℃以上〜42℃未満)"}
      ${"cool"}   | ${"低温泉(25℃以上〜34℃未満)"}
      ${"cold"}   | ${"冷鉱泉(25℃未満)"}
    `("returns $expected when value is $value", ({ value, expected }) => {
      const temperature = new Temperature(value);
      expect(temperature.getTextWithInstruction()).toBe(expected);
    });
  });

  describe("#equals", () => {
    it.each`
      value1   | value2      | expected
      ${"hot"} | ${"hot"}    | ${true}
      ${"hot"} | ${"normal"} | ${false}
    `(
      "returns $expected when value1 is $value1 and value2 is $value2",
      ({ value1, value2, expected }) => {
        const temperature1 = new Temperature(value1);
        const temperature2 = new Temperature(value2);
        expect(temperature1.equals(temperature2)).toBe(expected);
      }
    );
  });

  describe("#copy", () => {
    it("returns a new instance with the same value", () => {
      const temperature = new Temperature("hot");
      const copied = temperature.copy();
      expect(copied).not.toBe(temperature);
      expect(copied.equals(temperature)).toBe(true);
    });
  });
});
