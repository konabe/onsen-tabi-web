import type { Meta, StoryFn, StoryObj } from "@storybook/react";
import {
  reactRouterParameters,
  withRouter,
} from "storybook-addon-react-router-v6";
import NavBar from "./NavBar";
import NavItem from "./NavItem";

const meta = {
  title: "components/molecules/NavBar",
  component: NavBar,
  decorators: [withRouter],
  parameters: {
    layout: "padded",
    reactRouter: reactRouterParameters({}),
  },
  tags: ["autodocs"],
  argTypes: {
    leftNav: {
      options: ["empty", "navItem"],
      mapping: { empty: null, navItem: <NavItem path="" text="左メニュー" /> },
    },
    rightNav: {
      options: ["empty", "navItem"],
      mapping: { empty: null, navItem: <NavItem path="" text="右メニュー" /> },
    },
  },
} satisfies Meta<typeof NavBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    leftNav: <NavItem path="" text="左メニュー" />,
    rightNav: <NavItem path="" text="右メニュー" />,
  },
};
