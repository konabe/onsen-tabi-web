import { AreaName } from "../../../../domain/models/area/areaName";

describe("AreaName", () => {
  it("#displayingName", () => {
    const areaName = new AreaName("湯沢");
    expect(areaName.displayingName()).toEqual("湯沢温泉");
  });
});
