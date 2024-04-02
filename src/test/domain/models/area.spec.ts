import { AreaEntity, AreaEntityParameter } from "../../../domain/models/area";

describe("Area", () => {
  const commonParams: AreaEntityParameter = {
    id: 0,
    name: "鳴子",
    prefecture: "宮城県",
    nationalResort: true,
    village: "鳴子温泉",
    url: "https://www.welcome-naruko.jp/",
    description: "鳴子温泉は、宮城県大崎市鳴子温泉にある温泉。",
    onsenIds: [],
  };

  describe("#constructor", () => {
    it("should be created", () => {
      const area = new AreaEntity(commonParams);
      expect(area).toBeDefined();
    });
  });

  describe("#displayingName", () => {
    it("should return the name with '温泉'", () => {
      const area = new AreaEntity(commonParams);
      expect(area.displayingName()).toBe("鳴子温泉");
    });
  });
});
