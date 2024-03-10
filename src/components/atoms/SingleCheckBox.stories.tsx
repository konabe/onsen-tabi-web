import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import SingleCheckBox from "./SingleCheckBox";

const meta = {
  title: "components/atoms/SingleCheckBox",
  component: SingleCheckBox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof SingleCheckBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    value: false,
  },
  render: ({ ...args }) => {
    const [value, setValue] = useState<boolean>(args.value);
    return (
      <SingleCheckBox
        value={value}
        onChange={(v) => setValue(v)}
        label="チェック"
      />
    );
  },
};

export const On: Story = {
  args: {
    value: true,
  },
  render: ({ ...args }) => {
    const [value, setValue] = useState<boolean>(args.value);
    return (
      <SingleCheckBox
        value={value}
        onChange={(v) => setValue(v)}
        label="チェック"
      />
    );
  },
};
