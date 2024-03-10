import type { Meta, StoryObj } from "@storybook/react";

import Tag from "./Tag";

const meta = {
  title: "components/atoms/Tag",
  component: Tag,
  tags: ["autodocs"],
  argTypes: {
    text: { control: "text", description: "タグのテキスト" },
    hexColor: { control: "color", description: "タグの背景色" },
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: "温泉",
    hexColor: undefined,
  },
};

export const Red: Story = {
  args: {
    ...Default.args,
    hexColor: "#ff0000",
  },
};
