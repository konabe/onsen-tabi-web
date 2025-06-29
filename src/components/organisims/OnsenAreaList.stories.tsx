import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  reactRouterParameters,
  withRouter,
} from "storybook-addon-remix-react-router";

import { AreaEntity, AreaEntityParameter } from "../../domain/models/area";
import { prefectures } from "../../share/prefecture";
import OnsenAreaList from "./OnsenAreaList";

const meta = {
  title: "components/organisms/OnsenAreaList",
  component: OnsenAreaList,
  parameters: {
    layout: "padded",
    reactRouter: reactRouterParameters({}),
  },
  decorators: [withRouter],
  tags: ["autodocs"],
  argTypes: {
    areas: { cotrol: "object" },
    prefectures: { cotrol: "object" },
  },
} satisfies Meta<typeof OnsenAreaList>;

export default meta;
type Story = StoryObj<typeof meta>;

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

export const Primary: Story = {
  args: {
    areas: [
      new AreaEntity({
        ...commonArea,
        name: "鳴子",
        prefecture: "宮城県",
      }),
      new AreaEntity({
        ...commonArea,
        name: "東鳴子",
        prefecture: "宮城県",
      }),
      new AreaEntity({
        ...commonArea,
        name: "西鳴子",
        prefecture: "宮城県",
      }),
      new AreaEntity({
        ...commonArea,
        name: "南鳴子",
        prefecture: "宮城県",
      }),
      new AreaEntity({
        ...commonArea,
        name: "北鳴子",
        prefecture: "宮城県",
      }),
      new AreaEntity({
        ...commonArea,
        name: "中鳴子",
        prefecture: "宮城県",
      }),
      new AreaEntity({
        ...commonArea,
        name: "外鳴子",
        prefecture: "宮城県",
      }),
      new AreaEntity({
        ...commonArea,
        name: "内鳴子",
        prefecture: "宮城県",
      }),
      new AreaEntity({
        ...commonArea,
        name: "月岡",
        prefecture: "新潟県",
      }),
      new AreaEntity({
        ...commonArea,
        name: "草津",
        prefecture: "群馬県",
      }),
      new AreaEntity({
        ...commonArea,
        name: "伊香保",
        prefecture: "群馬県",
      }),
    ],
    prefectures: prefectures(),
  },
};
