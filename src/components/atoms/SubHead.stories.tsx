import type { Meta, StoryObj } from "@storybook/react-vite";

import SubHead from "./SubHead";

const meta = {
  title: "components/atoms/SubHead",
  component: SubHead,
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text", description: "サブヘッダーのタイトル" },
  },
} satisfies Meta<typeof SubHead>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: "温泉",
  },
};
