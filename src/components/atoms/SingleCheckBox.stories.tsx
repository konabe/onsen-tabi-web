import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import SingleCheckBox from "./SingleCheckBox";

const meta = {
  title: "components/atoms/SingleCheckBox",
  component: SingleCheckBox,
  tags: ["autodocs"],
  argTypes: {
    value: { control: "boolean", description: "チェック状態" },
    label: { control: "text", description: "ラベルテキスト" },
    onChange: { description: "チェック状態変更ハンドラ" },
  },
} satisfies Meta<typeof SingleCheckBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const On: Story = {
  args: {
    value: true,
    label: "チェック",
    onChange: () => {},
  },
  render: ({ ...args }) => {
    const [value, setValue] = useState<boolean>(args.value);
    return (
      <SingleCheckBox
        value={value}
        onChange={(v) => setValue(v)}
        label={args.label}
      />
    );
  },
};

export const Off: Story = {
  args: {
    value: false,
    label: "チェック",
    onChange: () => {},
  },
  render: ({ ...args }) => {
    const [value, setValue] = useState<boolean>(args.value);
    return (
      <SingleCheckBox
        value={value}
        onChange={(v) => setValue(v)}
        label={args.label}
      />
    );
  },
};
