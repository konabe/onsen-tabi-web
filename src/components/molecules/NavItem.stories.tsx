import type { Meta, StoryObj } from "@storybook/react";
import {
  reactRouterParameters,
  withRouter,
} from "storybook-addon-react-router-v6";
import NavItem from "./NavItem";

const meta = {
  title: "components/molecules/NavItem",
  component: NavItem,
  decorators: [withRouter],
  parameters: {
    layout: "padded",
    reactRouter: reactRouterParameters({}),
  },
  tags: ["autodocs"],
  argTypes: {
    path: { control: "text" },
    text: { control: "text" },
  },
} satisfies Meta<typeof NavItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    text: "左メニュー",
    path: "",
  },
};
