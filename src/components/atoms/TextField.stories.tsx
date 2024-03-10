import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import TextField from "./TextField";

const meta = {
  title: "components/atoms/TextField",
  component: TextField,
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
    value: { control: "text", description: "入力値" },
    onChange: {
      description: "入力値変更イベントハンドラー",
    },
    autoComplete: {
      control: "text",
      description: "autoComplete属性の値",
    },
    isPassword: {
      control: "boolean",
      description: "パスワード入力か",
    },
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: "ラベル",
    value: "",
    onChange: (_: string) => {},
  },
  render: ({ ...args }) => {
    const [value, setValue] = useState<string>("");
    return (
      <TextField
        {...args}
        value={value}
        onChange={(v: any) => {
          setValue(v);
          action("onChange")(v);
        }}
      />
    );
  },
};

export const Password: Story = {
  args: {
    label: "パスワード",
    value: "",
    onChange: (_: string) => {},
  },
  render: ({ ...args }) => {
    const [value, setValue] = useState<string>("");
    return (
      <TextField
        {...args}
        value={value}
        onChange={(v: any) => {
          setValue(v);
          action("onChange")(v);
        }}
        isPassword={true}
      />
    );
  },
};

export const NoLabel: Story = {
  args: {
    label: undefined,
    value: "",
    onChange: (_: string) => {},
  },
  render: ({ ...args }) => {
    const [value, setValue] = useState<string>("");
    return (
      <TextField
        {...args}
        value={value}
        onChange={(v: any) => {
          setValue(v);
          action("onChange")(v);
        }}
      />
    );
  },
};
