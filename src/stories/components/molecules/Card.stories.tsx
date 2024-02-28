import type { Meta, StoryObj } from "@storybook/react";
import Card from "../../../components/molecules/Card";

const meta = {
  title: "components/molecules/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    children: { control: "text" },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { children: <p>Hello, World!</p> },
};

export const Image: Story = {
  args: {
    children: <p>Hello, World!</p>,
    imgUrl: "https://placehold.jp/150x150.png",
  },
};
