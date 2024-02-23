import type { Meta, StoryObj } from "@storybook/react";
import Loading from "../../../components/atoms/Loading";

const meta = {
  title: "components/atoms/Loading",
  component: Loading,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Loading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
