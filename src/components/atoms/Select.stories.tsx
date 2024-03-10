import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import Select from "./Select";

const meta = {
  title: "components/atoms/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
  args: {
    label: "選択肢",
    name: "road",
    options: [
      { label: "選択なし", value: undefined },
      { label: "天国への道", value: "option1" },
      { label: "地獄への道", value: "option2" },
    ],
    isMulti: false,
    value: undefined,
    defaultValue: undefined,
  },
  render: ({ ...args }) => {
    const [value, setValue] = useState<string | undefined>(undefined);
    return (
      <div style={{ width: 300 }}>
        <Select
          {...{ ...args, isMulti: false }}
          value={value}
          onChange={(v: any) => {
            setValue(v);
            action("onChange")(v);
          }}
        />
      </div>
    );
  },
};

export const Multi: Story = {
  args: {
    label: "複数の選択肢",
    name: "multi-road",
    options: [
      { label: "A", value: "option1" },
      { label: "B", value: "option2" },
      { label: "C", value: "option3" },
    ],
    isMulti: true,
    value: [],
    defaultValue: [],
  },
  render: ({ ...args }) => {
    const [value, setValue] = useState<string[]>([]);
    return (
      <div style={{ width: 300 }}>
        <Select
          {...{ ...args, isMulti: true }}
          value={value}
          onChange={(v: any) => {
            setValue(v);
            action("onChange")(v);
          }}
        />
      </div>
    );
  },
};

export const NoLabel: Story = {
  args: {
    name: "road",
    options: [
      { label: "選択なし", value: undefined },
      { label: "天国への道", value: "option1" },
      { label: "地獄への道", value: "option2" },
    ],
    isMulti: false,
    value: undefined,
    defaultValue: undefined,
  },
  render: ({ ...args }) => {
    const [value, setValue] = useState<string | undefined>(undefined);
    return (
      <div style={{ width: 300 }}>
        <Select
          {...{ ...args, isMulti: false }}
          value={value}
          onChange={(v: any) => {
            setValue(v);
            action("onChange")(v);
          }}
        />
      </div>
    );
  },
};
