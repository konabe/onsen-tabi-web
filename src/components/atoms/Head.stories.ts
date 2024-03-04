import type { Meta, StoryObj } from "@storybook/react";
import Head from "./Head";

const meta = {
  title: "components/atoms/Head",
  component: Head,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    emoji: {
      control: "radio",
      options: ["📌", "🏕️", "♨", "🏞️"],
      defaultValue: "♨",
      description: "絵文字",
    },
    title: { control: "text", description: "ヘッダーテキスト" },
  },
} satisfies Meta<typeof Head>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: "温泉",
    emoji: "♨",
  },
};
