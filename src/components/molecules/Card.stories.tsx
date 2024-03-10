import type { Meta, StoryObj } from "@storybook/react";

import Card from "./Card";

const meta = {
  title: "components/molecules/Card",
  component: Card,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    children: { description: "コンテンツ要素" },
    imgUrl: { description: "カードの画像URL" },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: (
      <div>
        <h1>Message</h1>
        <p>Hello, World!</p>
      </div>
    ),
  },
};

export const Image: Story = {
  args: {
    children: (
      <div>
        <h1>Message</h1>
        <p>Hello, World!</p>
      </div>
    ),
    imgUrl: "https://placehold.jp/150x150.png",
  },
};
