import type { Meta, StoryObj } from "@storybook/react-vite";

import RelatedContents from "./RelatedContents";

const meta = {
  title: "components/organisms/RelatedContents",
  component: RelatedContents,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text", description: "コンテンツタイトル" },
    children: { control: "object", description: "コンテンツの内容" },
  },
} satisfies Meta<typeof RelatedContents>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: "コンテンツタイトル",
    children: (
      <div>
        <p>関連コンテンツの内容がここに来ます</p>
      </div>
    ),
  },
};
