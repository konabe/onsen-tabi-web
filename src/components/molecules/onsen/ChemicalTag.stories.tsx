import type { Meta, StoryObj } from "@storybook/react";

import { ChemicalTagModel } from "../../../domain/models/onsen/chemicalTagModel";
import ChemicalTag from "./ChemicalTag";

const meta = {
  title: "components/molecules/ChemicalTag",
  component: ChemicalTag,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    isOmitted: {
      control: { type: "boolean" },
      description: "省略タグか",
    },
    chemical: {
      control: { type: "object" },
    },
  },
} satisfies Meta<typeof ChemicalTag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { chemical: new ChemicalTagModel("NaIon") },
};

export const Omitted: Story = {
  args: { chemical: new ChemicalTagModel("NaIon"), isOmitted: true },
};
