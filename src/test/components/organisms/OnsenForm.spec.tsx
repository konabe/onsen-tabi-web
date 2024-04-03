import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import selectEvent from "react-select-event";

import OnsenForm from "../../../components/organisims/OnsenForm";
import { AreaEntity } from "../../../domain/models/area";
import {
  OnsenEntity,
  OnsenEntityParameter,
} from "../../../domain/models/onsen";
import { commonAreaParams } from "../../stubs/props";

describe("OnsenForm", () => {
  const onChange = vi.fn();
  const onSubmitClick = vi.fn();

  it("should be rendered when initialized", () => {
    render(
      <OnsenForm
        formTitle="温泉フォーム"
        value={undefined}
        areas={[
          new AreaEntity({
            ...commonAreaParams(),
            id: 1,
            name: "鳴子",
          }),
          new AreaEntity({
            ...commonAreaParams(),
            id: 2,
            name: "東鳴子",
          }),
        ]}
        onChange={onChange}
        onSubmitClick={onSubmitClick}
      />
    );
    expect(screen.getByText("温泉フォーム")).toBeInTheDocument();
    expect(screen.getByLabelText("名前")).toBeInTheDocument();
    expect(screen.getByLabelText("その他泉質")).toBeInTheDocument();
    expect(screen.getByLabelText("日帰り入浴あり")).toBeInTheDocument();
    expect(screen.getByLabelText("URL")).toBeInTheDocument();
    expect(screen.getByLabelText("画像URL")).toBeInTheDocument();
    expect(screen.getByLabelText("説明")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "送信" })).toBeInTheDocument();
  });

  it("should be able to input and submit", async () => {
    render(
      <OnsenForm
        formTitle="温泉フォーム"
        value={undefined}
        areas={[
          new AreaEntity({
            ...commonAreaParams(),
            id: 1,
            name: "鳴子",
          }),
          new AreaEntity({
            ...commonAreaParams(),
            id: 2,
            name: "東鳴子",
          }),
        ]}
        onChange={onChange}
        onSubmitClick={onSubmitClick}
      />
    );
    // 入力
    const nameField = screen.getByLabelText("名前");
    await userEvent.type(nameField, "大滝乃湯");
    expect(onChange).toHaveBeenLastCalledWith(
      new OnsenEntity({
        id: -1,
        name: "大滝乃湯", // ここだけ変わっていることを確認する
        generatedSpringQuality: "",
        otherSpringQuality: "",
        chemicals: [],
        liquid: undefined,
        osmoticPressure: undefined,
        temperature: undefined,
        form: "sotoyu",
        isDayUse: false,
        url: "",
        imgURL: null,
        description: "",
        area: undefined,
      })
    );
    const springField = screen.getByLabelText("その他泉質");
    const chemicalsSelect = screen.getByLabelText("成分");
    const osmoticPressureSelect = screen.getByLabelText("浸透圧");
    const liquidSelect = screen.getByLabelText("液性");
    const tempratureSelect = screen.getByLabelText("温度");
    const formSelect = screen.getByLabelText("形態");
    const isDayUseCheckBox = screen.getByLabelText("日帰り入浴あり");
    const areaField = screen.getByLabelText("エリア");
    const urlField = screen.getByLabelText("URL");
    const imgURLField = screen.getByLabelText("画像URL");
    const descriptionField = screen.getByLabelText("説明");
    const submitButton = screen.getByRole("button", { name: "送信" });
    await userEvent.type(springField, "メモ");
    await selectEvent.select(chemicalsSelect, ["硫黄"]);
    await selectEvent.select(
      osmoticPressureSelect,
      "低張性(溶存物質総量8g/kg未満, 凝固点-0.55℃以上)"
    );
    await selectEvent.select(liquidSelect, "酸性(pH3未満)");
    await selectEvent.select(tempratureSelect, "高温泉(42℃以上)");
    await selectEvent.select(formSelect, "外湯");
    await userEvent.click(isDayUseCheckBox);
    await selectEvent.select(areaField, "鳴子");
    await userEvent.type(urlField, "https://www.gorokaku.com/");
    await userEvent.type(imgURLField, "https://placehold.jp/150x150.png");
    await userEvent.type(
      descriptionField,
      "まずはロビーの歴史を感じる雰囲気に圧倒される"
    );
    // 送信
    await userEvent.click(submitButton);
    expect(onSubmitClick).toBeCalledWith(
      new OnsenEntity({
        id: -1,
        name: "大滝乃湯",
        generatedSpringQuality: "",
        chemicals: ["S"],
        osmoticPressure: "hypotonic",
        liquid: "acidic",
        temperature: "hot",
        form: "sotoyu",
        imgURL: "https://placehold.jp/150x150.png",
        otherSpringQuality: "メモ",
        description: "まずはロビーの歴史を感じる雰囲気に圧倒される",
        isDayUse: true,
        url: "https://www.gorokaku.com/",
        area: {
          id: 1,
          name: "鳴子",
        },
      })
    );
    expect(nameField).toHaveValue("");
    expect(springField).toHaveValue("");
    expect(isDayUseCheckBox).toBeChecked();
    expect(urlField).toHaveValue("");
    expect(imgURLField).toHaveValue("");
    expect(descriptionField).toHaveValue("");
    expect(screen.getByRole("form")).toHaveFormValues({
      chemicals: "",
      "osmotic-pressure": "",
      liquid: "",
      temperature: "",
      form: "sotoyu",
      area: "",
    });
  });

  it("should be updated with initial value", async () => {
    const commonParams: OnsenEntityParameter = {
      id: -1,
      name: "大滝乃湯",
      generatedSpringQuality: "",
      otherSpringQuality: "メタケイ酸泉",
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
      area: undefined,
    };
    render(
      <OnsenForm
        formTitle="温泉フォーム"
        value={
          new OnsenEntity({
            ...commonParams,
          })
        }
        areas={[
          new AreaEntity({
            ...commonAreaParams(),
            id: 1,
            name: "鳴子",
          }),
          new AreaEntity({
            ...commonAreaParams(),
            id: 2,
            name: "東鳴子",
          }),
        ]}
        onChange={onChange}
        onSubmitClick={onSubmitClick}
      />
    );
    // 入力
    const nameField = screen.getByLabelText("名前");
    const springField = screen.getByLabelText("その他泉質");
    const isDayUseCheckBox = screen.getByLabelText("日帰り入浴あり");
    const urlField = screen.getByLabelText("URL");
    const imgURLField = screen.getByLabelText("画像URL");
    const descriptionField = screen.getByLabelText("説明");
    const submitButton = screen.getByRole("button", { name: "送信" });
    expect(nameField).toHaveValue("大滝乃湯");
    expect(springField).toHaveValue("メタケイ酸泉");
    expect(screen.getByRole("form")).toHaveFormValues({
      chemicals: ["NaIon", "ClIon"],
      "osmotic-pressure": "isotonic",
      liquid: "mildly_alkaline",
      temperature: "hot",
      form: "sotoyu",
    });
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

  it("should be updated with null value", async () => {
    const commonParams: OnsenEntityParameter = {
      id: -1,
      name: "大滝乃湯",
      generatedSpringQuality: "",
      otherSpringQuality: "メタケイ酸泉",
      chemicals: [],
      liquid: undefined,
      osmoticPressure: undefined,
      temperature: undefined,
      form: "sotoyu",
      isDayUse: true,
      url: "https://onsen-kusatsu.com/ohtakinoyu/",
      imgURL: "https://placehold.jp/150x150.png",
      description:
        "徐々に体を慣らしながら熱いお湯に浸かるための合わせ湯を楽しむことができる。",
      area: undefined,
    };
    render(
      <OnsenForm
        formTitle="温泉フォーム"
        value={
          new OnsenEntity({
            ...commonParams,
          })
        }
        areas={[
          new AreaEntity({
            ...commonAreaParams(),
            id: 1,
            name: "鳴子",
          }),
          new AreaEntity({
            ...commonAreaParams(),
            id: 2,
            name: "東鳴子",
          }),
        ]}
        onChange={onChange}
        onSubmitClick={onSubmitClick}
      />
    );
    // 入力
    const nameField = screen.getByLabelText("名前");
    const springField = screen.getByLabelText("その他泉質");
    const isDayUseCheckBox = screen.getByLabelText("日帰り入浴あり");
    const urlField = screen.getByLabelText("URL");
    const imgURLField = screen.getByLabelText("画像URL");
    const descriptionField = screen.getByLabelText("説明");
    const submitButton = screen.getByRole("button", { name: "送信" });
    expect(nameField).toHaveValue("大滝乃湯");
    expect(springField).toHaveValue("メタケイ酸泉");
    expect(screen.getByRole("form")).toHaveFormValues({
      chemicals: "",
      "osmotic-pressure": "",
      liquid: "",
      temperature: "",
      form: "sotoyu",
    });
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
