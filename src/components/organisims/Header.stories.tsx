import type { Meta, StoryObj } from "@storybook/react-vite";

import Header from "./Header";

const meta = {
  title: "components/organisms/Header",
  component: Header,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
export const Smartphone: Story = {
  decorators: (Story) => (
    <div style={{ width: "375px" }}>
      <Story />
    </div>
  ),
};
export const Tablet: Story = {
  decorators: (Story) => (
    <div style={{ width: "820px" }}>
      <Story />
    </div>
  ),
};
