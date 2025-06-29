import type { Meta, StoryObj } from "@storybook/react-vite";
import { ComponentProps, useState } from "react";
import { action } from "storybook/actions";

import TextArea from "./TextArea";

const meta = {
  title: "components/atoms/TextArea",
  component: TextArea,
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
  },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

const WrpapedComponent = ({ ...args }: ComponentProps<typeof TextArea>) => {
  const [value, setValue] = useState<string>(args.value);
  return (
    <TextArea
      {...args}
      value={value}
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

export const NoLabel: Story = {
  args: {
    label: undefined,
    value: "",
    onChange: (_: string) => {},
  },
  render: ({ ...args }) => <WrpapedComponent {...args} />,
};
