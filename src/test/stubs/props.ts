import { AreaEntityParameter } from "../../domain/models/area";

export const commonAreaProps = (): AreaEntityParameter => ({
  id: 0,
  name: "鳴子",
  kana: "なるこ",
  prefecture: "宮城県",
  nationalResort: true,
  village: "鳴子温泉",
  url: "https://www.welcome-naruko.jp/",
  description: "鳴子温泉は、宮城県大崎市鳴子温泉にある温泉。",
  access: "東北自動車道・鳴子温泉ICから車で約10分",
  onsenIds: [],
});
