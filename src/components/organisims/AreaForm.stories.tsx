import type { Meta, StoryObj } from "@storybook/react-vite";

import { AreaEntity } from "../../domain/models/area";
import AreaForm from "./AreaForm";

const meta = {
  title: "components/organisms/AreaForm",
  component: AreaForm,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    formTitle: { control: "text", description: "フォームのタイトル" },
    value: { control: "object", description: "フォームの初期値" },
    onChange: { description: "フォームの値の変更イベントハンドラー" },
    onSubmitClick: { description: "送信の押下イベントハンドラー" },
  },
} satisfies Meta<typeof AreaForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    formTitle: "エリアフォーム",
    value: new AreaEntity({
      id: 0,
      name: "鳴子",
      kana: "なるこ",
      prefecture: "宮城県",
      nationalResort: true,
      village: "鳴子温泉",
      url: "https://www.welcome-naruko.jp/",
      description: "鳴子温泉は、宮城県大崎市鳴子温泉にある温泉。",
      access: "JR東日本東北本線・鳴子温泉駅から徒歩約10分",
      onsenIds: [],
    }),
    onChange: () => {},
  },
};

export const New: Story = {
  args: {
    value: undefined,
    onChange: () => {},
  },
};
