import type { Meta, StoryObj } from "@storybook/react-vite";

import SubHead from "../atoms/SubHead";
import Article from "./Article";

const meta = {
  title: "components/organisms/Article",
  component: Article,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    emoji: {
      control: "radio",
      options: ["📌", "🏕️", "♨", "🏞️"],
      description: "絵文字アイコン",
    },
    title: { control: "text", description: "タイトルテキスト" },
    children: { description: "記事の内容" },
  },
} satisfies Meta<typeof Article>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    emoji: "📌",
    title: "ブックマーク",
    children: (
      <div>
        <SubHead title="お役立ちリンク" />
        <p>お役立ちのリンクがありますね</p>
      </div>
    ),
  },
};
