import type { Meta, StoryObj } from "@storybook/react-vite";

import Description from "./Description";

const meta = {
  title: "components/molecules/Description",
  component: Description,
  tags: ["autodocs"],
  argTypes: {
    text: { control: "text" },
  },
} satisfies Meta<typeof Description>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OneLine: Story = {
  args: {
    text: "草津温泉の中でも最も好きな外湯。",
  },
};

export const MultiLine: Story = {
  args: {
    text: "草津温泉の中でも最も好きな外湯。\nこじんまりとした脱衣所に対して壮大に広がる露天風呂とそれを張る温泉。そしてその向こうに見える山の連なりは息を呑むほどに美しい。\n深さはそこまでなく、半身浴も気軽に楽しめる。",
  },
};

export const InColumnFlex: Story = {
  parameters: {
    layout: "padded",
  },
  decorators: [
    (Story: React.FC) => (
      <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
        <Story />
      </div>
    ),
  ],
  args: {
    text: "草津温泉の中でも最も好きな外湯。\n深さはそこまでなく、半身浴も気軽に楽しめる。",
  },
};
