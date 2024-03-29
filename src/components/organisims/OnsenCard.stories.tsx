import type { Meta, StoryObj } from "@storybook/react";

import { OnsenEntity } from "../../domain/models/onsen";
import OnsenCard from "./OnsenCard";

const meta = {
  title: "components/organisms/OnsenCard",
  component: OnsenCard,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    onsen: { control: "object" },
  },
} satisfies Meta<typeof OnsenCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const commonEntity = () =>
  new OnsenEntity({
    id: 1,
    name: "大滝乃湯",
    generatedSpringQuality: "ナトリウム塩化物泉",
    otherSpringQuality: "",
    chemicals: ["NaIon", "ClIon"],
    liquid: "mildly_alkaline",
    osmoticPressure: "isotonic",
    temperature: "hot",
    form: "sotoyu",
    isDayUse: true,
    url: "https://onsen-kusatsu.com/ohtakinoyu/",
    imgURL: "https://placehold.jp/150x150.png",
    description:
      "徐々に体を慣らしながら熱いお湯に浸かるための合わせ湯を楽しむことができる。\nその独特の空気感はまさにテーマパークのよう。\n大浴場も広々としていて、まさに草津的な余裕感に癒される。\n白濁の日には清掃によって剥がされた湯の花が一斉に解き放たれる。贅沢な気分になりたいのであれば狙って通うとよい。",
    area: undefined,
  });

export const Primary: Story = {
  args: {
    onsen: commonEntity(),
  },
};

export const Small: Story = {
  args: {
    onsen: commonEntity(),
  },
  decorators: (Story) => (
    <div style={{ width: "300px" }}>
      <Story />
    </div>
  ),
};
