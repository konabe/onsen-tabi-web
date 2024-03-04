import type { Meta, StoryObj } from "@storybook/react";
import ChemicalTag from "./ChemicalTag";
import { ChemicalTagModel } from "../../../domain/models/onsen/chemicalTagModel";

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
      description: "省略するかどうか",
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
