import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import HotelForm from "../../../components/organisims/HotelForm";
import {
  HotelEntity,
  HotelEntityParameter,
} from "../../../domain/models/hotel";

describe("HotelForm", () => {
  const onChange = vi.fn();
  const onSubmitClick = vi.fn();

  it("should be rendered when initialized", () => {
    render(
      <HotelForm
        formTitle="ホテルフォーム"
        value={undefined}
        onChange={onChange}
        onSubmitClick={onSubmitClick}
      />
    );
    expect(screen.getByText("ホテルフォーム")).toBeInTheDocument();
    expect(screen.getByLabelText("名前")).toBeInTheDocument();
    expect(screen.getByLabelText("和室あり")).toBeInTheDocument();
    expect(screen.getByLabelText("URL")).toBeInTheDocument();
    expect(screen.getByLabelText("説明")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "送信" })).toBeInTheDocument();
  });

  it("should be able to input and submit", async () => {
    const commonParams: HotelEntityParameter = {
      id: -1,
      name: "",
      hasWashitsu: true,
      description: "",
      url: "",
    };
    render(
      <HotelForm
        formTitle="ホテルフォーム"
        value={undefined}
        onChange={onChange}
        onSubmitClick={onSubmitClick}
      />
    );
    // 入力
    const nameField = screen.getByLabelText("名前");
    await userEvent.type(nameField, "伍楼閣");
    expect(onChange).toHaveBeenLastCalledWith(
      new HotelEntity({
        ...commonParams,
        name: "伍楼閣",
      })
    );
    const hasWashitsuCheckbox = screen.getByLabelText("和室あり");
    const urlField = screen.getByLabelText("URL");
    const descriptionField = screen.getByLabelText("説明");
    const submitButton = screen.getByRole("button", { name: "送信" });
    await userEvent.click(hasWashitsuCheckbox);
    await userEvent.type(urlField, "http://www.gorokaku.com/");
    await userEvent.type(
      descriptionField,
      "まずはロビーの歴史を感じる雰囲気に圧倒される"
    );
    // 送信
    await userEvent.click(submitButton);
    expect(onSubmitClick).toBeCalledWith(
      new HotelEntity({
        ...commonParams,
        name: "伍楼閣",
        hasWashitsu: false,
        url: "http://www.gorokaku.com/",
        description: "まずはロビーの歴史を感じる雰囲気に圧倒される",
      })
    );
    expect(nameField).toHaveValue("");
    expect(hasWashitsuCheckbox).toBeChecked();
    expect(urlField).toHaveValue("");
    expect(descriptionField).toHaveValue("");
  });

  it("should be updated with initial value", async () => {
    const commonParams: HotelEntityParameter = {
      id: -1,
      name: "伍楼閣",
      hasWashitsu: false,
      url: "http://www.gorokaku.com/",
      description: "まずはロビーの歴史を感じる雰囲気に圧倒される",
    };
    render(
      <HotelForm
        formTitle="ホテルフォーム"
        value={
          new HotelEntity({
            ...commonParams,
          })
        }
        onChange={onChange}
        onSubmitClick={onSubmitClick}
      />
    );
    // 入力
    const nameField = screen.getByLabelText("名前");
    const hasWashitsuCheckbox = screen.getByLabelText("和室あり");
    const urlField = screen.getByLabelText("URL");
    const descriptionField = screen.getByLabelText("説明");
    const submitButton = screen.getByRole("button", { name: "送信" });
    expect(nameField).toHaveValue("伍楼閣");
    expect(hasWashitsuCheckbox).not.toBeChecked();
    expect(urlField).toHaveValue("http://www.gorokaku.com/");
    expect(descriptionField).toHaveValue(
      "まずはロビーの歴史を感じる雰囲気に圧倒される"
    );
    await userEvent.click(submitButton);
    expect(onSubmitClick).toBeCalledWith(
      new HotelEntity({
        ...commonParams,
        name: "伍楼閣",
        hasWashitsu: false,
        url: "http://www.gorokaku.com/",
        description: "まずはロビーの歴史を感じる雰囲気に圧倒される",
      })
    );
  });
});
