import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)", "../src/**/*.mdx"],

  addons: [
    "@storybook/addon-links",
    "@storybook/addon-onboarding",
    "storybook-addon-remix-react-router",
    "@storybook/addon-docs",
  ],

  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
};
export default config;
