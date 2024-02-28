import type { Meta, StoryFn, StoryObj } from "@storybook/react";
import Button from "../../../components/atoms/Button";

const meta = {
  title: "components/atoms/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: "送信",
    onClick: () => console.log("Click"),
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
  onClick: () => console.log("Click"),
};