import type { Meta, StoryObj } from "@storybook/react";

import Loading from "./Loading";

const meta = {
  title: "components/atoms/Loading",
  component: Loading,
  tags: ["autodocs"],
} satisfies Meta<typeof Loading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
