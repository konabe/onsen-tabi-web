import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import AreaForm from "../../../components/organisims/AreaForm";
import { AreaEntity, AreaEntityParameter } from "../../../domain/models/area";

describe("AreaForm", () => {
  const onChange = vi.fn();
  const onSubmitClick = vi.fn();

  it("should be rendered when initialized", () => {
    render(
      <AreaForm
        formTitle="エリアフォーム"
        value={undefined}
        onChange={onChange}
        onSubmitClick={onSubmitClick}
      />
    );
    expect(screen.getByText("エリアフォーム")).toBeInTheDocument();
    expect(screen.getByLabelText("名前")).toBeInTheDocument();
    expect(screen.getByLabelText("カナ")).toBeInTheDocument();
    expect(screen.getByLabelText("都道府県")).toBeInTheDocument();
    expect(screen.getByLabelText("温泉郷")).toBeInTheDocument();
    expect(screen.getByLabelText("URL")).toBeInTheDocument();
    expect(screen.getByLabelText("国民保養温泉地")).toBeInTheDocument();
    expect(screen.getByLabelText("説明")).toBeInTheDocument();
    expect(screen.getByLabelText("アクセス")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "送信" })).toBeInTheDocument();
  });

  it("should be able to input and submit", async () => {
    const commonParams: AreaEntityParameter = {
      id: -1,
      name: "",
      kana: "",
      prefecture: "",
      nationalResort: false,
      village: "",
      url: "",
      description: "",
      access: "",
      onsenIds: [],
    };
    render(
      <AreaForm
        formTitle="エリアフォーム"
        value={undefined}
        onChange={onChange}
        onSubmitClick={onSubmitClick}
      />
    );
    // 入力
    const nameField = screen.getByLabelText("名前");
    await userEvent.type(nameField, "四万");
    expect(onChange).toHaveBeenLastCalledWith(
      new AreaEntity({
        ...commonParams,
        name: "四万",
      })
    );
    const kanaField = screen.getByLabelText("カナ");
    const prefectureField = screen.getByLabelText("都道府県");
    const villageField = screen.getByLabelText("温泉郷");
    const urlField = screen.getByLabelText("URL");
    const hoyoCheckbox = screen.getByLabelText("国民保養温泉地");
    const descriptionField = screen.getByLabelText("説明");
    const accessField = screen.getByLabelText("アクセス");
    const submitButton = screen.getByRole("button");
    await userEvent.type(kanaField, "しま");
    await userEvent.type(prefectureField, "群馬県");
    await userEvent.type(urlField, "https://nakanojo-kanko.jp/shima/");
    await userEvent.click(hoyoCheckbox);
    await userEvent.type(descriptionField, "四万温泉は...");
    await userEvent.type(accessField, "JR四万駅から徒歩10分");
    // 送信
    await userEvent.click(submitButton);
    expect(onSubmitClick).toBeCalledWith(
      new AreaEntity({
        ...commonParams,
        name: "四万",
        kana: "しま",
        nationalResort: true,
        prefecture: "群馬県",
        url: "https://nakanojo-kanko.jp/shima/",
        village: undefined,
        description: "四万温泉は...",
        access: "JR四万駅から徒歩10分",
      })
    );
    expect(nameField).toHaveValue("");
    expect(kanaField).toHaveValue("");
    expect(prefectureField).toHaveValue("");
    expect(villageField).toHaveValue("");
    expect(urlField).toHaveValue("");
    expect(hoyoCheckbox).not.toBeChecked();
    expect(descriptionField).toHaveValue("");
    expect(accessField).toHaveValue("");
  });

  it("should be updated with initial value", async () => {
    const commonParams: AreaEntityParameter = {
      id: -1,
      name: "四万",
      kana: "しま",
      nationalResort: true,
      prefecture: "群馬県",
      url: "https://nakanojo-kanko.jp/shima/",
      village: undefined,
      description: "四万温泉は...",
      access: "JR四万駅から徒歩10分",
      onsenIds: [],
    };
    render(
      <AreaForm
        formTitle="エリアフォーム"
        value={
          new AreaEntity({
            ...commonParams,
          })
        }
        onChange={onChange}
        onSubmitClick={onSubmitClick}
      />
    );
    // 入力
    const nameField = screen.getByLabelText("名前");
    const kanaField = screen.getByLabelText("カナ");
    const prefectureField = screen.getByLabelText("都道府県");
    const villageField = screen.getByLabelText("温泉郷");
    const urlField = screen.getByLabelText("URL");
    const hoyoCheckbox = screen.getByLabelText("国民保養温泉地");
    const descriptionField = screen.getByLabelText("説明");
    const accessField = screen.getByLabelText("アクセス");
    const submitButton = screen.getByRole("button");
    expect(nameField).toHaveValue("四万");
    expect(kanaField).toHaveValue("しま");
    expect(prefectureField).toHaveValue("群馬県");
    expect(villageField).toHaveValue("");
    expect(urlField).toHaveValue("https://nakanojo-kanko.jp/shima/");
    expect(hoyoCheckbox).toBeChecked();
    expect(descriptionField).toHaveValue("四万温泉は...");
    expect(accessField).toHaveValue("JR四万駅から徒歩10分");
    await userEvent.click(submitButton);
    expect(onSubmitClick).toBeCalledWith(
      new AreaEntity({
        ...commonParams,
        name: "四万",
        kana: "しま",
        nationalResort: true,
        prefecture: "群馬県",
        url: "https://nakanojo-kanko.jp/shima/",
        village: undefined,
        description: "四万温泉は...",
        access: "JR四万駅から徒歩10分",
      })
    );
  });
});
