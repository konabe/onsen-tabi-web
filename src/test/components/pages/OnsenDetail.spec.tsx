import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import OnsenDetail from "../../../components/pages/OnsenDetail";
import { OnsenEntity } from "../../../domain/models/onsen";
import { OnsenRepositoryMock } from "../../stubs/repositoryStubs";

const useNavigateMock = vi.fn();
vi.mock("react-router-dom", async (importOriginal) => {
  const actual: any = await importOriginal();
  return {
    ...actual,
    useNavigate: () => useNavigateMock,
  };
});

describe("OnsenDetail", () => {
  const onsenRepository = OnsenRepositoryMock();

  const renderOnsenDetail = ({
    path,
    isSignedIn,
  }: {
    path: string;
    isSignedIn: boolean;
  }) => {
    render(
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route
            path="/onsen/:id"
            element={
              <OnsenDetail
                isSignedIn={isSignedIn}
                dependencies={{
                  onsenRepository,
                }}
              />
            }
          />
        </Routes>
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    onsenRepository.read = vi.fn().mockResolvedValue(
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
      })
    );
    onsenRepository.update = vi.fn();
    useNavigateMock.mockClear();
  });

  describe("@init", () => {
    it("should render if signed in", async () => {
      renderOnsenDetail({ path: "/onsen/1", isSignedIn: true });
      expect(screen.getByText("ローディング中")).toBeInTheDocument();

      await waitFor(() =>
        expect(screen.getByLabelText("名前")).toHaveValue("大滝乃湯")
      );
      expect(onsenRepository.read).toBeCalledTimes(1);
      expect(onsenRepository.read).toBeCalledWith(1);
      expect(screen.queryByText("ローディング中")).not.toBeInTheDocument();

      // loaded
      expect(screen.getByText("♨ 大滝乃湯")).toBeInTheDocument();
      expect(screen.getByRole("img")).toHaveAttribute(
        "src",
        "https://placehold.jp/150x150.png"
      );
      expect(
        screen.getAllByText(
          "徐々に体を慣らしながら熱いお湯に浸かるための合わせ湯を楽しむことができる。"
        )
      ).toHaveLength(2);
      expect(screen.getByText("ナトリウム塩化物泉")).toBeInTheDocument();
      expect(screen.getAllByText("ナトリウムイオン")).toHaveLength(2);
      expect(screen.getAllByText("塩化物イオン")).toHaveLength(2);
      expect(screen.getAllByText("等張性")).toHaveLength(1);
      expect(screen.getAllByText("弱アルカリ性")).toHaveLength(1);
      expect(screen.getAllByText("高温泉")).toHaveLength(1);
      expect(screen.getAllByText("外湯")).toHaveLength(2);
      expect(screen.getByText("あり")).toBeInTheDocument();
      expect(
        screen.getByText("https://onsen-kusatsu.com/ohtakinoyu/")
      ).toHaveAttribute("href", "https://onsen-kusatsu.com/ohtakinoyu/");
      // form
      expect(screen.getByLabelText("名前")).toHaveValue("大滝乃湯");
      expect(screen.getByLabelText("その他泉質")).toHaveValue("");
      // TODO: a11y & testablity <form>を経由して値を受け取るようにする
      // expect(screen.getByLabelText("浸透圧")).toHaveValue("isotonic");
      // expect(screen.getByLabelText("液性")).toHaveValue("mildly_alkaline");
      // expect(screen.getByLabelText("温度")).toHaveValue("hot");
      // expect(screen.getByLabelText("形態")).toHaveValue("sotoyu");
      expect(screen.getByLabelText("日帰り入浴あり")).toBeChecked();
      expect(screen.getByLabelText("URL")).toHaveValue(
        "https://onsen-kusatsu.com/ohtakinoyu/"
      );
      expect(screen.getByLabelText("画像URL")).toHaveValue(
        "https://placehold.jp/150x150.png"
      );
      expect(screen.getByLabelText("説明")).toHaveValue(
        "徐々に体を慣らしながら熱いお湯に浸かるための合わせ湯を楽しむことができる。"
      );
      // submit
      const submitButton = screen.getByRole("button", { name: "送信" });
      await userEvent.click(submitButton);
      expect(onsenRepository.update).toBeCalledTimes(1);
    });

    it("should render if not signed in", async () => {
      renderOnsenDetail({ path: "/onsen/1", isSignedIn: false });
      expect(screen.getByText("ローディング中")).toBeInTheDocument();

      await waitFor(() => {
        expect(onsenRepository.read).toBeCalledTimes(1);
      });
      expect(onsenRepository.read).toBeCalledTimes(1);
      expect(onsenRepository.read).toBeCalledWith(1);
      expect(screen.queryByText("ローディング中")).not.toBeInTheDocument();

      // loaded
      expect(screen.getByText("♨ 大滝乃湯")).toBeInTheDocument();
      expect(screen.getByRole("img")).toHaveAttribute(
        "src",
        "https://placehold.jp/150x150.png"
      );
      expect(
        screen.getAllByText(
          "徐々に体を慣らしながら熱いお湯に浸かるための合わせ湯を楽しむことができる。"
        )
      ).toHaveLength(1);
      expect(screen.getByText("ナトリウム塩化物泉")).toBeInTheDocument();
      expect(screen.getAllByText("ナトリウムイオン")).toHaveLength(1);
      expect(screen.getAllByText("塩化物イオン")).toHaveLength(1);
      expect(screen.getAllByText("等張性")).toHaveLength(1);
      expect(screen.getAllByText("弱アルカリ性")).toHaveLength(1);
      expect(screen.getAllByText("高温泉")).toHaveLength(1);
      expect(screen.getAllByText("外湯")).toHaveLength(1);
      expect(screen.getByText("あり")).toBeInTheDocument();
      expect(
        screen.getByText("https://onsen-kusatsu.com/ohtakinoyu/")
      ).toHaveAttribute("href", "https://onsen-kusatsu.com/ohtakinoyu/");
      const submitButton = screen.queryByRole("button", { name: "送信" });
      expect(submitButton).not.toBeInTheDocument();
    });
  });

  describe("@error", () => {
    it("should go error page if loading is failed", async () => {
      onsenRepository.read = vi.fn().mockRejectedValue(new Error("error"));
      renderOnsenDetail({ path: "/onsen/1", isSignedIn: true });
      expect(screen.getByText("ローディング中")).toBeInTheDocument();

      await waitFor(() => expect(onsenRepository.read).toBeCalled());
      expect(useNavigateMock).toBeCalledWith("/error");
    });

    it("should go error page if updating is failed", async () => {
      onsenRepository.update = vi.fn().mockRejectedValue(new Error("error"));
      renderOnsenDetail({ path: "/onsen/1", isSignedIn: true });

      await waitFor(() => expect(onsenRepository.read).toBeCalled());
      const submitButton = screen.getByRole("button", { name: "送信" });
      await userEvent.click(submitButton);
      expect(onsenRepository.update).toBeCalledTimes(1);
      expect(useNavigateMock).toBeCalledWith("/error");
    });
  });
});
