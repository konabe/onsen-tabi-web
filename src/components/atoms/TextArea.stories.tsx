import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import TextArea from "./TextArea";

const meta = {
  title: "components/atoms/TextArea",
  component: TextArea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof TextArea>;

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
      <div style={{ width: 300 }}>
        <TextArea
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

export const NoLabel: Story = {
  args: {
    value: "",
    onChange: (_: string) => {},
  },
  render: ({ ...args }) => {
    const [value, setValue] = useState<string>("");
    return (
      <div style={{ width: 300 }}>
        <TextArea
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
