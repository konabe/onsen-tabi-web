import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import TextArea from "./TextArea";
import { useState } from "react";

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
