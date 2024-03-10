import type { Meta, StoryObj } from "@storybook/react";

import SubHead from "./SubHead";

const meta = {
  title: "components/atoms/SubHead",
  component: SubHead,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
  },
} satisfies Meta<typeof SubHead>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: "温泉",
  },
};
