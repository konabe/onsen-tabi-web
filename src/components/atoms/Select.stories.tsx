import type { Meta, StoryObj } from "@storybook/react-vite";
import { ComponentProps, useState } from "react";
import { action } from "storybook/actions";

import Select from "./Select";

const meta = {
  title: "components/atoms/Select",
  component: Select,
  tags: ["autodocs"],
  decorators: (Story: React.FC) => {
    return (
      <div style={{ width: 300 }}>
        <Story />
      </div>
    );
  },
  argTypes: {
    label: { control: "text", description: "ラベルテキスト" },
    name: { control: "text", description: "name属性" },
    options: { control: "object", description: "選択肢" },
    isMulti: { control: "boolean", description: "複数選択可能か" },
    value: { control: "object", description: "選択した値" },
    defaultValue: { control: "object", description: "デフォルト値" },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const SingleSelectComponent = ({ ...args }: ComponentProps<typeof Select>) => {
  const [value, setValue] = useState<string | undefined>(undefined);
  return (
    <Select
      {...{ ...args, isMulti: false }}
      value={value}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- TODO: 型情報を定義したい
      onChange={(v: any) => {
        setValue(v);
        action("onChange")(v);
      }}
    />
  );
};

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
    onChange: () => {},
  },
  render: ({ ...args }) => <SingleSelectComponent {...args} />,
};

const MultiSelectComponent = ({ ...args }: ComponentProps<typeof Select>) => {
  const [value, setValue] = useState<string[]>([]);
  return (
    <Select
      {...{ ...args, isMulti: true }}
      value={value}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- TODO: 型情報を定義したい
      onChange={(v: any) => {
        setValue(v);
        action("onChange")(v);
      }}
    />
  );
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
    onChange: () => {},
  },
  render: ({ ...args }) => <MultiSelectComponent {...args} />,
};

export const NoLabel: Story = {
  args: { ...Single.args, label: undefined },
  render: ({ ...args }) => <SingleSelectComponent {...args} />,
};
