import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import selectEvent from "react-select-event";

import OnsenForm from "../../../components/organisims/OnsenForm";
import {
  OnsenEntity,
  OnsenEntityParameter,
} from "../../../domain/models/onsen";

describe("OnsenForm", () => {
  const onChange = vi.fn();
  const onSubmitClick = vi.fn();

  it("should be rendered when initialized", () => {
    render(
      <OnsenForm
        formTitle="温泉フォーム"
        value={undefined}
        onChange={onChange}
        onSubmitClick={onSubmitClick}
      />
    );
    expect(screen.getByText("温泉フォーム")).toBeInTheDocument();
    expect(screen.getByLabelText("名前")).toBeInTheDocument();
    expect(screen.getByLabelText("泉質")).toBeInTheDocument();
    expect(screen.getByLabelText("日帰り入力あり")).toBeInTheDocument();
    expect(screen.getByLabelText("URL")).toBeInTheDocument();
    expect(screen.getByLabelText("画像URL")).toBeInTheDocument();
    expect(screen.getByLabelText("説明")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "送信" })).toBeInTheDocument();
  });

  it("should be able to input and submit", async () => {
    const commonParams: OnsenEntityParameter = {
      id: -1,
      name: "",
      generatedSpringQuality: "",
      userSpringQuality: "",
      chemicals: [],
      liquid: undefined,
      osmoticPressure: undefined,
      temperature: undefined,
      form: "sotoyu",
      isDayUse: false,
      url: "",
      imgURL: null,
      description: "",
    };
    render(
      <OnsenForm
        formTitle="温泉フォーム"
        value={undefined}
        onChange={onChange}
        onSubmitClick={onSubmitClick}
      />
    );
    // 入力
    const nameField = screen.getByLabelText("名前");
    await userEvent.type(nameField, "大滝乃湯");
    expect(onChange).toHaveBeenLastCalledWith(
      new OnsenEntity({
        ...commonParams,
        name: "大滝乃湯",
      })
    );
    const springField = screen.getByLabelText("泉質");
    const chemicalsSelect = screen.getByLabelText("成分");
    const osmoticPressureSelect = screen.getByLabelText("浸透圧");
    const liquidSelect = screen.getByLabelText("液性");
    const tempratureSelect = screen.getByLabelText("温度");
    const formSelect = screen.getByLabelText("形態");
    const isDayUseCheckBox = screen.getByLabelText("日帰り入力あり");
    const urlField = screen.getByLabelText("URL");
    const imgURLField = screen.getByLabelText("画像URL");
    const descriptionField = screen.getByLabelText("説明");
    const submitButton = screen.getByRole("button", { name: "送信" });
    await userEvent.type(springField, "メモ");
    await selectEvent.select(chemicalsSelect, ["硫黄"]);
    await selectEvent.select(osmoticPressureSelect, "低張性");
    await selectEvent.select(liquidSelect, "酸性(pH3未満)");
    await selectEvent.select(tempratureSelect, "高温泉(42℃以上)");
    await selectEvent.select(formSelect, "外湯");
    await userEvent.click(isDayUseCheckBox);
    await userEvent.type(urlField, "http://www.gorokaku.com/");
    await userEvent.type(imgURLField, "https://placehold.jp/150x150.png");
    await userEvent.type(
      descriptionField,
      "まずはロビーの歴史を感じる雰囲気に圧倒される"
    );
    // 送信
    await userEvent.click(submitButton);
    expect(onSubmitClick).toBeCalledWith(
      new OnsenEntity({
        ...commonParams,
        name: "大滝乃湯",
        chemicals: ["S"],
        osmoticPressure: "hypotonic",
        liquid: "acidic",
        temperature: "hot",
        form: "sotoyu",
        imgURL: "https://placehold.jp/150x150.png",
        userSpringQuality: "メモ",
        description: "まずはロビーの歴史を感じる雰囲気に圧倒される",
        isDayUse: true,
        url: "http://www.gorokaku.com/",
      })
    );
    expect(nameField).toHaveValue("");
    expect(springField).toHaveValue("");
    expect(isDayUseCheckBox).toBeChecked();
    expect(urlField).toHaveValue("");
    expect(imgURLField).toHaveValue("");
    expect(descriptionField).toHaveValue("");
  });

  it("should be updated with initial value", async () => {
    const commonParams: OnsenEntityParameter = {
      id: -1,
      name: "大滝乃湯",
      generatedSpringQuality: "",
      userSpringQuality: "メタケイ酸泉",
      chemicals: ["NaIon", "ClIon"],
      liquid: "mildly_alkaline",
      osmoticPressure: "isotonic",
      temperature: "hot",
      form: "sotoyu",
      isDayUse: true,
      url: "https://onsen-kusatsu.com/ohtakinoyu/",
      imgURL: "https://placehold.jp/150x150.png",
      description:
        "徐々に体を慣らしながら熱いお湯に浸かるための合わせ湯を楽しむことができる。",
    };
    render(
      <OnsenForm
        formTitle="温泉フォーム"
        value={
          new OnsenEntity({
            ...commonParams,
          })
        }
        onChange={onChange}
        onSubmitClick={onSubmitClick}
      />
    );
    // 入力
    const nameField = screen.getByLabelText("名前");
    const springField = screen.getByLabelText("泉質");
    // TODO: a11y & testablity <form>を経由して値を受け取るようにする
    // https://testing-library.com/docs/ecosystem-react-select-event/
    // const chemicalsSelect = screen.getByLabelText("成分");
    // const osmoticPressureSelect = screen.getByLabelText("浸透圧");
    // const liquidSelect = screen.getByLabelText("液性");
    // const tempratureSelect = screen.getByLabelText("温度");
    // const formSelect = screen.getByLabelText("形態");
    const isDayUseCheckBox = screen.getByLabelText("日帰り入力あり");
    const urlField = screen.getByLabelText("URL");
    const imgURLField = screen.getByLabelText("画像URL");
    const descriptionField = screen.getByLabelText("説明");
    const submitButton = screen.getByRole("button", { name: "送信" });
    expect(nameField).toHaveValue("大滝乃湯");
    expect(springField).toHaveValue("メタケイ酸泉");
    // expect(chemicalsSelect).toHaveValue(["NaIon", "ClIon"]);
    // expect(osmoticPressureSelect).to("isotonic");
    // expect(liquidSelect).toHaveValue("mildly_alkaline");
    // expect(tempratureSelect).toHaveValue("hot");
    // expect(formSelect).toHaveValue("sotoyu");
    expect(isDayUseCheckBox).toBeChecked();
    expect(urlField).toHaveValue("https://onsen-kusatsu.com/ohtakinoyu/");
    expect(imgURLField).toHaveValue("https://placehold.jp/150x150.png");
    expect(descriptionField).toHaveValue(
      "徐々に体を慣らしながら熱いお湯に浸かるための合わせ湯を楽しむことができる。"
    );
    await userEvent.click(submitButton);
    expect(onSubmitClick).toBeCalledWith(
      new OnsenEntity({
        ...commonParams,
      })
    );
  });
});
