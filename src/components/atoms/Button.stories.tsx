import type { Meta, StoryFn, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Button from "./Button";

const meta = {
  title: "components/atoms/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    onClick: { action: "clicked" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: "送信",
    onClick: action("clicked"),
  },
};

const FlexTemplate: StoryFn<typeof Button> = (args) => (
  <div style={{ width: "300px", display: "flex", flexDirection: "column" }}>
    <Button {...args} />
  </div>
);

export const Flex = FlexTemplate.bind({});
Flex.args = {
  title: "送信",
  onClick: action("clicked"),
};
