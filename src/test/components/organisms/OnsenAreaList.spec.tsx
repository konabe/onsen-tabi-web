import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import OnsenAreaList from "../../../components/organisims/OnsenAreaList";
import { AreaEntity, AreaEntityParameter } from "../../../domain/models/area";
import { prefectures } from "../../../share/prefecture";

describe("OnsenAreaList", () => {
  it("should be displayed", () => {
    const commonArea: AreaEntityParameter = {
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
    };
    render(
      <OnsenAreaList
        areas={[
          new AreaEntity({
            ...commonArea,
            id: 1,
            name: "鳴子",
            prefecture: "宮城県",
          }),
          new AreaEntity({
            ...commonArea,
            id: 2,
            name: "東鳴子",
            prefecture: "宮城県",
          }),
          new AreaEntity({
            ...commonArea,
            id: 3,
            name: "西鳴子",
            prefecture: "宮城県",
          }),
          new AreaEntity({
            ...commonArea,
            id: 4,
            name: "南鳴子",
            prefecture: "宮城県",
          }),
          new AreaEntity({
            ...commonArea,
            id: 5,
            name: "北鳴子",
            prefecture: "宮城県",
          }),
          new AreaEntity({
            ...commonArea,
            id: 6,
            name: "中鳴子",
            prefecture: "宮城県",
          }),
          new AreaEntity({
            ...commonArea,
            id: 7,
            name: "外鳴子",
            prefecture: "宮城県",
          }),
          new AreaEntity({
            ...commonArea,
            id: 8,
            name: "内鳴子",
            prefecture: "宮城県",
          }),
          new AreaEntity({
            ...commonArea,
            id: 9,
            name: "月岡",
            prefecture: "新潟県",
          }),
          new AreaEntity({
            ...commonArea,
            id: 10,
            name: "草津",
            prefecture: "群馬県",
          }),
          new AreaEntity({
            ...commonArea,
            id: 11,
            name: "伊香保",
            prefecture: "群馬県",
          }),
          new AreaEntity({
            ...commonArea,
            id: 12,
            name: "存在しないエリア",
            prefecture: "存在しない県",
          }),
        ]}
        prefectures={prefectures()}
      />,
      { wrapper: MemoryRouter }
    );
    expect(screen.getByText("宮城県")).toBeInTheDocument();
    expect(screen.getByText("鳴子温泉")).toBeInTheDocument();
    expect(screen.getByText("鳴子温泉")).toHaveAttribute("href", "/area/1");
    expect(screen.getByText("東鳴子温泉")).toBeInTheDocument();
    expect(screen.getByText("東鳴子温泉")).toHaveAttribute("href", "/area/2");
    expect(screen.getByText("群馬県")).toBeInTheDocument();
    expect(screen.getByText("草津温泉")).toBeInTheDocument();
    expect(screen.getByText("草津温泉")).toHaveAttribute("href", "/area/10");
    expect(screen.getByText("新潟県")).toBeInTheDocument();
    expect(screen.getByText("月岡温泉")).toBeInTheDocument();
    expect(screen.queryByText("存在しない県")).not.toBeInTheDocument();
    expect(screen.queryByText("存在しないエリア")).not.toBeInTheDocument();
  });
});
