import { AreaName } from "../../../../domain/models/area/areaName";

describe("AreaName", () => {
  describe("#value", () => {
    it("returns the value", () => {
      const areaName = new AreaName("湯沢");
      expect(areaName.value).toEqual("湯沢");
    });
  });

  describe("#displayingName", () => {
    it("returns the displaying name", () => {
      const areaName = new AreaName("湯沢");
      expect(areaName.displayingName()).toEqual("湯沢温泉");
    });
  });
});
