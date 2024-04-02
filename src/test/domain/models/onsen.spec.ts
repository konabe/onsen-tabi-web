import {
  OnsenEntity,
  OnsenEntityParameter,
} from "../../../domain/models/onsen";

describe("Onsen", () => {
  const commonParams: OnsenEntityParameter = {
    id: 1,
    name: "大滝乃湯",
    generatedSpringQuality: "ナトリウム塩化物泉",
    otherSpringQuality: "ナトリウム塩化物泉",
    chemicals: ["NaIon", "ClIon"],
    liquid: "mildly_alkaline",
    osmoticPressure: "isotonic",
    temperature: "hot",
    form: "sotoyu",
    isDayUse: true,
    url: "https://onsen-kusatsu.com/ohtakinoyu/",
    imgURL: "https://placehold.jp/150x150.png",
    description:
      "徐々に体を慣らしながら熱いお湯に浸かるための合わせ湯を楽しむことができる。\nその独特の空気感はまさにテーマパークのよう。\n大浴場も広々としていて、まさに草津的な余裕感に癒される。\n白濁の日には清掃によって剥がされた湯の花が一斉に解き放たれる。贅沢な気分になりたいのであれば狙って通うとよい。",
    area: {
      id: 1,
      name: "草津",
    },
  };

  describe("#constructor", () => {
    it("should be created", () => {
      const onsen = new OnsenEntity(commonParams);
      expect(onsen).toBeDefined();
    });
  });

  describe("getter/setter", () => {
    it("should return the value", () => {
      const onsen = new OnsenEntity(commonParams);
      expect(onsen.chemicals).toEqual(["NaIon", "ClIon"]);
      expect(onsen.liquid).toBe("mildly_alkaline");
      expect(onsen.form).toBe("sotoyu");
      expect(onsen.osmoticPressure).toBe("isotonic");
      expect(onsen.temperature).toBe("hot");
      expect(onsen.generatedSprintQuality).toBe("ナトリウム塩化物泉");
      expect(onsen.otherSpringQuality).toBe("ナトリウム塩化物泉");
      expect(onsen.imgURL).toBe("https://placehold.jp/150x150.png");
      expect(onsen.area?.name).toBe("草津");
      expect(onsen).toBeDefined();
    });

    it("should return the value that was set", () => {
      const onsen = new OnsenEntity(commonParams);
      onsen.liquid = "neutral";
      onsen.form = "uchiyu";
      onsen.osmoticPressure = "hypertonic";
      onsen.temperature = "cold";
      onsen.otherSpringQuality = "メタケイ酸泉";
      expect(onsen.liquid).toBe("neutral");
      expect(onsen.form).toBe("uchiyu");
      expect(onsen.osmoticPressure).toBe("hypertonic");
      expect(onsen.temperature).toBe("cold");
      expect(onsen.otherSpringQuality).toBe("メタケイ酸泉");
      expect(onsen).toBeDefined();
    });

    it("should return undefined if its value is not defined", () => {
      const onsen = new OnsenEntity({
        ...commonParams,
        liquid: undefined,
        generatedSpringQuality: undefined,
        osmoticPressure: undefined,
      });
      expect(onsen.chemicals).toEqual(["NaIon", "ClIon"]);
      expect(onsen.liquid).toBeUndefined();
      expect(onsen.osmoticPressure).toBeUndefined();
      expect(onsen.generatedSprintQuality).toBeUndefined();
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
          otherSpringQuality: userSpringQuality,
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

  describe("#getTemperatureText", () => {
    it.each`
      temperature | expected
      ${"hot"}    | ${"高温泉"}
      ${"normal"} | ${"温泉"}
      ${"cool"}   | ${"低温泉"}
      ${"cold"}   | ${"冷鉱泉"}
      ${null}     | ${undefined}
    `("should return $expected", ({ temperature, expected }) => {
      const onsen = new OnsenEntity({ ...commonParams, temperature });
      expect(onsen.getTemperatureText()).toBe(expected);
    });
  });

  describe("#getSubText", () => {
    it("should return ", () => {
      const onsen = new OnsenEntity(commonParams);
      expect(onsen.getSubText()).toBe("(等張性・弱アルカリ性・高温泉)");
    });
  });

  describe("#getChemicalTags", () => {
    it("should return the chemical tags", () => {
      const onsen = new OnsenEntity(commonParams);
      expect(onsen.getChemicalTags()).toEqual(["NaIon", "ClIon"]);
    });

    it("should return simple if the chemical is empty", () => {
      const onsen = new OnsenEntity({ ...commonParams, chemicals: [] });
      expect(onsen.getChemicalTags()).toEqual(["Simple"]);
    });
  });

  describe("displayingAreaName", () => {
    it("should return the name with '温泉'", () => {
      const onsen = new OnsenEntity(commonParams);
      expect(onsen.displayingAreaName()).toBe("草津温泉");
    });
  });
});
