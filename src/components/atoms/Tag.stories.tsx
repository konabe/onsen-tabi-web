import type { Meta, StoryObj } from "@storybook/react";
import Tag from "./Tag";

const meta = {
  title: "components/atoms/Tag",
  component: Tag,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    text: { control: "text" },
    hexColor: { control: "color" },
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    text: "温泉",
  },
};

export const Red: Story = {
  args: {
    text: "温泉",
    hexColor: "#ff0000",
  },
};
