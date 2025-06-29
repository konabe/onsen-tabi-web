import type { Meta, StoryObj } from "@storybook/react-vite";
import { ComponentProps, useState } from "react";
import { action } from "storybook/actions";

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

const WrpapedComponent = ({ ...args }: ComponentProps<typeof TextField>) => {
  const [value, setValue] = useState<string>("");
  return (
    <TextField
      {...args}
      value={value}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- TODO: 型情報を定義したい
      onChange={(v: any) => {
        setValue(v);
        action("onChange")(v);
      }}
    />
  );
};

export const Primary: Story = {
  args: {
    label: "ラベル",
    value: "",
    onChange: (_: string) => {},
  },
  render: ({ ...args }) => <WrpapedComponent {...args} />,
};

export const Password: Story = {
  args: {
    label: "パスワード",
    value: "",
    isPassword: true,
    onChange: (_: string) => {},
  },
  render: ({ ...args }) => <WrpapedComponent {...args} />,
};

export const NoLabel: Story = {
  args: {
    label: undefined,
    value: "",
    onChange: (_: string) => {},
  },
  render: ({ ...args }) => <WrpapedComponent {...args} />,
};
