import type { Meta, StoryObj } from "@storybook/react";

import { HotelEntity } from "../../domain/models/hotel";
import HotelForm from "./HotelForm";

const meta = {
  title: "components/organisms/HotelForm",
  component: HotelForm,
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
} satisfies Meta<typeof HotelForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    formTitle: "ホテルフォーム",
    value: new HotelEntity({
      id: 1,
      name: "伍楼閣",
      hasWashitsu: true,
      description:
        "まずはロビーの歴史を感じる雰囲気に圧倒される。\n廊下が畳敷きになっていて、歩いていて非常に気持ちがよい。\n館内は比較的明るめで移動する楽しみがある。",
      url: "http://www.gorokaku.com/",
    }),
  },
};

export const New: Story = {
  args: {
    value: undefined,
  },
};
