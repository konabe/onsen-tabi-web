import type { Meta, StoryObj } from "@storybook/react-vite";

import { ChemicalTagModel } from "../../../domain/models/onsen/chemicalTagModel";
import ChemicalTag from "./ChemicalTag";

const meta = {
  title: "components/molecules/ChemicalTag",
  component: ChemicalTag,
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

export const NaTag: Story = {
  args: { chemical: new ChemicalTagModel("NaIon"), isOmitted: false },
};

export const Omitted: Story = {
  args: { chemical: new ChemicalTagModel("NaIon"), isOmitted: true },
};
