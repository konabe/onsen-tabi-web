import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router";
import selectEvent from "react-select-event";

import OnsenList from "../../../components/pages/OnsenList";
import { AreaEntity } from "../../../domain/models/area";
import { OnsenEntity } from "../../../domain/models/onsen";
import { commonAreaProps } from "../../stubs/props";
import {
  AreaRepositoryMock,
  OnsenRepositoryMock,
} from "../../stubs/repositoryStubs";

const useNavigateMock = vi.fn();
vi.mock("react-router", async (importOriginal) => {
  const actual: any = await importOriginal();
  return {
    ...actual,
    useNavigate: () => useNavigateMock,
  };
});

describe("OnsenList", () => {
  const onsenRepository = OnsenRepositoryMock();
  const areaRepository = AreaRepositoryMock();

  const renderOnsenList = ({ isSignedIn }: { isSignedIn: boolean }) => {
    render(
      <MemoryRouter initialEntries={["/onsens"]}>
        <Routes>
          <Route
            path="/onsens"
            element={
              <OnsenList
                isSignedIn={isSignedIn}
                dependencies={{ onsenRepository, areaRepository }}
              />
            }
          />
        </Routes>
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    onsenRepository.readAll = vi.fn().mockResolvedValue([
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
          "徐々に体を慣らしながら熱いお湯に浸かるための合わせ湯を楽しむことができる。",
        area: undefined,
      }),
      new OnsenEntity({
        id: 2,
        name: "小滝乃湯",
        generatedSpringQuality: "カルシウム硫酸塩泉",
        otherSpringQuality: "",
        chemicals: ["CaIon", "SO4Ion"],
        liquid: "alkaline",
        osmoticPressure: "hypotonic",
        temperature: "cool",
        form: "uchiyu",
        isDayUse: false,
        url: "https://onsen-kusatsu.com/kotakinoyu/",
        imgURL: "https://placehold.jp/300x300.png",
        description: "小さい滝が流れている",
        area: undefined,
      }),
    ]);
    areaRepository.readAll = vi.fn().mockResolvedValue([
      new AreaEntity({
        ...commonAreaProps(),
        id: 1,
        name: "鳴子",
        onsenIds: [1, 2, 3],
      }),
      new AreaEntity({
        ...commonAreaProps(),
        id: 2,
        name: "東鳴子",
        onsenIds: [4, 5],
      }),
    ]);
    useNavigateMock.mockClear();
    onsenRepository.create = vi.fn();
  });

  describe("@init", () => {
    it("should be displayed if signed in", async () => {
      renderOnsenList({ isSignedIn: true });
      expect(screen.getByText("ローディング中")).toBeInTheDocument();

      await waitFor(() => {
        expect(onsenRepository.readAll).toBeCalled();
      });
      expect(onsenRepository.readAll).toBeCalledTimes(1);
      expect(screen.queryByText("ローディング中")).not.toBeInTheDocument();

      // loaded
      expect(screen.getByText("♨ 温泉一覧")).toBeInTheDocument();
      expect(screen.getByText("大滝乃湯")).toBeInTheDocument();
      expect(screen.getByText("(等張性・弱アルカリ性・高温泉)"));
      expect(
        screen.getByText(
          "徐々に体を慣らしながら熱いお湯に浸かるための合わせ湯を楽しむことができる。"
        )
      ).toBeInTheDocument();
      expect(screen.getByText("小滝乃湯")).toBeInTheDocument();
      expect(screen.getByText("(低張性・アルカリ性・低温泉)"));
      expect(screen.getByText("小さい滝が流れている")).toBeInTheDocument();
      //form
      expect(screen.getByText("温泉の追加")).toBeInTheDocument();
      const nameField = screen.getByLabelText("名前");
      const springField = screen.getByLabelText("その他泉質");
      const chemicalsSelect = screen.getAllByLabelText("成分")[1];
      const osmoticPressureSelect = screen.getByLabelText("浸透圧");
      const liquidSelect = screen.getByLabelText("液性");
      const tempratureSelect = screen.getByLabelText("温度");
      const formSelect = screen.getByLabelText("形態");
      const isDayUseCheckBox = screen.getByLabelText("日帰り入浴あり");
      const urlField = screen.getByLabelText("URL");
      const imgURLField = screen.getByLabelText("画像URL");
      const descriptionField = screen.getByLabelText("説明");
      const submitButton = screen.getByRole("button", { name: "送信" });
      await userEvent.type(nameField, "大滝乃湯");
      await userEvent.type(springField, "メモ");
      await selectEvent.select(chemicalsSelect!, ["硫黄"]);
      await selectEvent.select(
        osmoticPressureSelect,
        "低張性(溶存物質総量8g/kg未満, 凝固点-0.55℃以上)"
      );
      await selectEvent.select(liquidSelect, "酸性(pH3未満)");
      await selectEvent.select(tempratureSelect, "高温泉(42℃以上)");
      await selectEvent.select(formSelect, "外湯");
      await userEvent.click(isDayUseCheckBox);
      await userEvent.type(urlField, "https://www.gorokaku.com/");
      await userEvent.type(imgURLField, "https://placehold.jp/150x150.png");
      await userEvent.type(
        descriptionField,
        "まずはロビーの歴史を感じる雰囲気に圧倒される"
      );
      // 送信
      await userEvent.click(submitButton);
      expect(onsenRepository.create).toBeCalledWith(
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
          area: undefined,
        })
      );
      expect(nameField).toHaveValue("");
      expect(springField).toHaveValue("");
      expect(isDayUseCheckBox).toBeChecked();
      expect(urlField).toHaveValue("");
      expect(imgURLField).toHaveValue("");
      expect(descriptionField).toHaveValue("");
    });

    it("should be displayed if not signed in", async () => {
      renderOnsenList({ isSignedIn: false });
      expect(screen.getByText("ローディング中")).toBeInTheDocument();

      await waitFor(() => {
        expect(onsenRepository.readAll).toBeCalled();
      });
      expect(onsenRepository.readAll).toBeCalledTimes(1);
      expect(screen.queryByText("ローディング中")).not.toBeInTheDocument();

      // loaded
      expect(screen.getByText("♨ 温泉一覧")).toBeInTheDocument();
      expect(screen.getByText("大滝乃湯")).toBeInTheDocument();
      expect(screen.getByText("(等張性・弱アルカリ性・高温泉)"));
      expect(
        screen.getByText(
          "徐々に体を慣らしながら熱いお湯に浸かるための合わせ湯を楽しむことができる。"
        )
      ).toBeInTheDocument();
      expect(screen.getByText("小滝乃湯")).toBeInTheDocument();
      expect(screen.getByText("(低張性・アルカリ性・低温泉)"));
      expect(screen.getByText("小さい滝が流れている")).toBeInTheDocument();

      expect(screen.queryByText("温泉の追加")).not.toBeInTheDocument();
    });
  });

  describe("@error", () => {
    it("should navigate error page if loading is failed", async () => {
      onsenRepository.readAll = vi.fn().mockRejectedValue(new Error("error"));
      renderOnsenList({ isSignedIn: true });
      expect(screen.getByText("ローディング中")).toBeInTheDocument();

      await waitFor(() => {
        expect(onsenRepository.readAll).toBeCalled();
      });
      expect(onsenRepository.readAll).toBeCalledTimes(1);
      expect(screen.queryByText("ローディング中")).not.toBeInTheDocument();

      expect(useNavigateMock).toBeCalledWith("/error");
    });

    it("should navigate error page if submitting is failed", async () => {
      onsenRepository.create = vi.fn().mockRejectedValue(new Error("error"));
      renderOnsenList({ isSignedIn: true });
      expect(screen.getByText("ローディング中")).toBeInTheDocument();

      await waitFor(() => {
        expect(onsenRepository.readAll).toBeCalled();
      });
      expect(onsenRepository.readAll).toBeCalledTimes(1);
      expect(screen.queryByText("ローディング中")).not.toBeInTheDocument();

      //form
      expect(screen.getByText("温泉の追加")).toBeInTheDocument();
      const nameField = screen.getByLabelText("名前");
      const springField = screen.getByLabelText("その他泉質");
      const chemicalsSelect = screen.getAllByLabelText("成分")[1];
      const osmoticPressureSelect = screen.getByLabelText("浸透圧");
      const liquidSelect = screen.getByLabelText("液性");
      const tempratureSelect = screen.getByLabelText("温度");
      const formSelect = screen.getByLabelText("形態");
      const isDayUseCheckBox = screen.getByLabelText("日帰り入浴あり");
      const urlField = screen.getByLabelText("URL");
      const imgURLField = screen.getByLabelText("画像URL");
      const descriptionField = screen.getByLabelText("説明");
      const submitButton = screen.getByRole("button", { name: "送信" });
      await userEvent.type(nameField, "大滝乃湯");
      await userEvent.type(springField, "メモ");
      await selectEvent.select(chemicalsSelect!, ["硫黄"]);
      await selectEvent.select(
        osmoticPressureSelect,
        "低張性(溶存物質総量8g/kg未満, 凝固点-0.55℃以上)"
      );
      await selectEvent.select(liquidSelect, "酸性(pH3未満)");
      await selectEvent.select(tempratureSelect, "高温泉(42℃以上)");
      await selectEvent.select(formSelect, "外湯");
      await userEvent.click(isDayUseCheckBox);
      await userEvent.type(urlField, "https://www.gorokaku.com/");
      await userEvent.type(imgURLField, "https://placehold.jp/150x150.png");
      await userEvent.type(
        descriptionField,
        "まずはロビーの歴史を感じる雰囲気に圧倒される"
      );
      // 送信
      await userEvent.click(submitButton);
      expect(useNavigateMock).toBeCalledWith("/error");
    });
  });
});
