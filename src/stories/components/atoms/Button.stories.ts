import type { Meta, StoryObj } from "@storybook/react";
import Button from "../../../components/atoms/Button";

const meta = {
  title: "components/atoms/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: "送信",
    onClick: () => console.log("Click"),
  },
};
