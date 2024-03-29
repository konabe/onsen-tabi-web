import type { Meta, StoryObj } from "@storybook/react";

import { OnsenEntity } from "../../domain/models/onsen";
import OnsenForm from "./OnsenForm";

const meta = {
  title: "components/organisms/OnsenForm",
  component: OnsenForm,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    formTitle: { control: "text", description: "フォームのタイトル" },
    value: { control: "object", description: "フォームの初期値" },
    onChange: { description: "フォームの値の変更イベントハンドラー" },
    onSubmitClick: { description: "送信の押下イベントハンドラー" },
  },
} satisfies Meta<typeof OnsenForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    formTitle: "温泉フォーム",
    value: new OnsenEntity({
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
    }),
    onChange: () => {},
  },
};

export const New: Story = {
  args: {
    value: undefined,
    onChange: () => {},
  },
};
