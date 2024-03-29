import type { Meta, StoryObj } from "@storybook/react";

import { HotelEntity } from "../../domain/models/hotel";
import HotelCard from "./HotelCard";

const meta = {
  title: "components/organisms/HotelCard",
  component: HotelCard,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    hotel: { control: "object" },
  },
} satisfies Meta<typeof HotelCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    hotel: new HotelEntity({
      id: 1,
      name: "伍楼閣",
      hasWashitsu: true,
      soloAvailable: false,
      description:
        "まずはロビーの歴史を感じる雰囲気に圧倒される。\n廊下が畳敷きになっていて、歩いていて非常に気持ちがよい。\n館内は比較的明るめで移動する楽しみがある。",
      url: "https://www.gorokaku.com/",
    }),
  },
};

export const Small: Story = {
  args: {
    hotel: { ...Primary.args.hotel },
  },
  decorators: (Story) => (
    <div style={{ width: "300px" }}>
      <Story />
    </div>
  ),
};
