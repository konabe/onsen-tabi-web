import { AreaEntityParameter } from "../../domain/models/area";

export const commonAreaParams = (): AreaEntityParameter => ({
  id: 0,
  name: "鳴子",
  prefecture: "宮城県",
  nationalResort: true,
  village: "鳴子温泉",
  url: "https://www.welcome-naruko.jp/",
  description: "鳴子温泉は、宮城県大崎市鳴子温泉にある温泉。",
  onsenIds: [],
});
