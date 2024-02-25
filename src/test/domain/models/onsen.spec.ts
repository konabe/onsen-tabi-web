import { describe, expect, it } from "vitest";
import {
  OnsenEntity,
  OnsenEntityParameter,
} from "../../../domain/models/onsen";

describe("Onsen", () => {
  const commonParams: OnsenEntityParameter = {
    id: 1,
    name: "大滝乃湯",
    generatedSpringQuality: "ナトリウム塩化物泉",
    userSpringQuality: "ナトリウム塩化物泉",
    chemicals: ["NaIon", "ClIon"],
    liquid: "mildly_alkaline",
    osmoticPressure: "isotonic",
    form: "sotoyu",
    isDayUse: true,
    url: "https://onsen-kusatsu.com/ohtakinoyu/",
    description:
      "徐々に体を慣らしながら熱いお湯に浸かるための合わせ湯を楽しむことができる。\nその独特の空気感はまさにテーマパークのよう。\n大浴場も広々としていて、まさに草津的な余裕感に癒される。\n白濁の日には清掃によって剥がされた湯の花が一斉に解き放たれる。贅沢な気分になりたいのであれば狙って通うとよい。",
  };

  describe("#constructor", () => {
    it("should be created", () => {
      const onsen = new OnsenEntity(commonParams);
      expect(onsen).toBeDefined();
    });
  });

  describe("#getQualityText", () => {
    it.each`
      userSpringQuality           | generatedSpringQuality    | expected
      ${"ナトリウム塩化物強塩泉"} | ${"ナトリウムー塩化物泉"} | ${"ナトリウムー塩化物泉 (ナトリウム塩化物強塩泉)"}
      ${"ナトリウム塩化物強塩泉"} | ${undefined}              | ${"(ナトリウム塩化物強塩泉)"}
      ${""}                       | ${"ナトリウムー塩化物泉"} | ${"ナトリウムー塩化物泉"}
      ${""}                       | ${undefined}              | ${""}
    `(
      "should return $expected",
      ({ userSpringQuality, generatedSpringQuality, expected }) => {
        const onsen = new OnsenEntity({
          ...commonParams,
          userSpringQuality,
          generatedSpringQuality,
        });
        expect(onsen.getQualityText()).toBe(expected);
      }
    );
  });

  describe("#getFormText", () => {
    it.each`
      form        | expected
      ${"uchiyu"} | ${"内湯"}
      ${"sotoyu"} | ${"外湯"}
    `("should return $expected", ({ form, expected }) => {
      const onsen = new OnsenEntity({ ...commonParams, form });
      expect(onsen.getFormText()).toBe(expected);
    });
  });

  describe("#getLiquidText", () => {
    it.each`
      liquid               | expected
      ${"acidic"}          | ${"酸性"}
      ${"mildly_acidic"}   | ${"弱酸性"}
      ${"neutral"}         | ${"中性"}
      ${"mildly_alkaline"} | ${"弱アルカリ性"}
      ${"alkaline"}        | ${"アルカリ性"}
      ${null}              | ${undefined}
    `("should return $expected", ({ liquid, expected }) => {
      const onsen = new OnsenEntity({ ...commonParams, liquid });
      expect(onsen.getLiquidText()).toBe(expected);
    });
  });

  describe("#getOsmoticPressureText", () => {
    it.each`
      osmoticPressure | expected
      ${"hypotonic"}  | ${"低張性"}
      ${"isotonic"}   | ${"等張性"}
      ${"hypertonic"} | ${"高張性"}
      ${null}         | ${undefined}
    `("should return $expected", ({ osmoticPressure, expected }) => {
      const onsen = new OnsenEntity({ ...commonParams, osmoticPressure });
      expect(onsen.getOsmoticPressureText()).toBe(expected);
    });
  });

  describe("#getSubText", () => {
    it("should return ", () => {
      const onsen = new OnsenEntity(commonParams);
      expect(onsen.getSubText()).toBe("(等張性・弱アルカリ性)");
    });
  });
});
