import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import TextField from "./TextField";
import { useState } from "react";

const meta = {
  title: "components/atoms/TextField",
  component: TextField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
  args: {
    label: "ラベル",
    value: "",
    onChange: (_: string) => {},
  },
  render: ({ ...args }) => {
    const [value, setValue] = useState<string>("");
    return (
      <div style={{ width: 300 }}>
        <TextField
          {...args}
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

export const Password: Story = {
  args: {
    label: "パスワード",
    value: "",
    onChange: (_: string) => {},
  },
  render: ({ ...args }) => {
    const [value, setValue] = useState<string>("");
    return (
      <div style={{ width: 300 }}>
        <TextField
          {...args}
          value={value}
          onChange={(v: any) => {
            setValue(v);
            action("onChange")(v);
          }}
          isPassword={true}
        />
      </div>
    );
  },
};
