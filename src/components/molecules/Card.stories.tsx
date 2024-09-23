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
    img: { description: "カードの画像に関するオブジェクト", control: "object" },
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
    img: {
      url: "https://placehold.jp/150x150.png",
      link: "https://placehold.jp/150x150.png",
    },
  },
};
