import type { Meta, StoryObj } from "@storybook/react";
import Head from "../../../components/atoms/Head";

const meta = {
  title: "components/atoms/Head",
  component: Head,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
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
