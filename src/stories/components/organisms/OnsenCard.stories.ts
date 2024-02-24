import type { Meta, StoryObj } from "@storybook/react";
import OnsenCard from "../../../components/organisims/OnsenCard";
import { OnsenEntity } from "../../../domain/models/onsen";
const meta = {
  title: "components/orgnaisms/OnsenCard",
  component: OnsenCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    onsen: { control: "text" },
  },
} satisfies Meta<typeof OnsenCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    onsen: new OnsenEntity({
      id: 1,
      name: "大滝乃湯",
      springQuality: "ナトリウム塩化物泉",
      springQualityUser: "",
      chemicals: ["NaIon", "ClIon"],
      liquid: "mildly_alkaline",
      osmoticPressure: "isotonic",
      form: "sotoyu",
      isDayUse: true,
      url: "https://onsen-kusatsu.com/ohtakinoyu/",
      description:
        "徐々に体を慣らしながら熱いお湯に浸かるための合わせ湯を楽しむことができる。\nその独特の空気感はまさにテーマパークのよう。\n大浴場も広々としていて、まさに草津的な余裕感に癒される。\n白濁の日には清掃によって剥がされた湯の花が一斉に解き放たれる。贅沢な気分になりたいのであれば狙って通うとよい。",
    }),
  },
};
