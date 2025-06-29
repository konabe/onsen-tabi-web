import type { Meta, StoryObj } from "@storybook/react-vite";
import { action } from "storybook/actions";

import Button from "./Button";

const meta = {
  title: "components/atoms/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text", description: "ボタンのタイトル" },
    onClick: { description: "クリック時のイベントハンドラー" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: "送信",
    onClick: action("onClick"),
  },
};

export const MultiLine: Story = {
  args: {
    ...Primary.args,
    title:
      "あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。",
  },
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story: React.FC) => (
      <div style={{ width: "300px", display: "flex", flexDirection: "column" }}>
        <Story />
      </div>
    ),
  ],
};

export const InColumnFlex: Story = {
  args: {
    ...Primary.args,
  },
  parameters: {
    layout: "padded",
  },
  decorators: [
    (Story: React.FC) => (
      <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
        <Story />
      </div>
    ),
  ],
};
