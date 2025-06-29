import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router";

import Home from "../../../components/pages/Home";
import { AreaEntity, AreaEntityParameter } from "../../../domain/models/area";
import { AreaRepositoryMock } from "../../stubs/repositoryStubs";

const useNavigateMock = vi.fn();
vi.mock("react-router", async (importOriginal) => {
  const actual: any = await importOriginal();
  return {
    ...actual,
    useNavigate: () => useNavigateMock,
  };
});

describe("Home", () => {
  const areaRepository = AreaRepositoryMock();

  const renderHome = ({ isSignedIn }: { isSignedIn: boolean }) => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route
            path="/"
            element={
              <Home isSignedIn={isSignedIn} dependencies={{ areaRepository }} />
            }
          />
        </Routes>
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    const commonArea: AreaEntityParameter = {
      id: 0,
      name: "鳴子",
      kana: "なるこ",
      prefecture: "宮城県",
      nationalResort: true,
      village: "鳴子温泉",
      url: "https://www.welcome-naruko.jp/",
      description: "鳴子温泉は、宮城県大崎市鳴子温泉にある温泉。",
      access: "鳴子温泉へのアクセス",
      onsenIds: [],
    };
    areaRepository.readAll = vi.fn().mockResolvedValue([
      new AreaEntity({
        ...commonArea,
        id: 1,
        name: "鳴子",
        prefecture: "宮城県",
        onsenIds: [1, 2, 3],
      }),
      new AreaEntity({
        ...commonArea,
        id: 2,
        name: "東鳴子",
        prefecture: "宮城県",
        onsenIds: [4, 5],
      }),
      new AreaEntity({
        ...commonArea,
        id: 3,
        name: "西鳴子",
        prefecture: "宮城県",
        onsenIds: [],
      }),
      new AreaEntity({
        ...commonArea,
        id: 4,
        name: "月岡",
        prefecture: "新潟県",
        onsenIds: [6, 7],
      }),
      new AreaEntity({
        ...commonArea,
        id: 7,
        name: "存在しない",
        prefecture: "沖縄県",
        onsenIds: [],
      }),
    ]);
    areaRepository.create = vi.fn();
    useNavigateMock.mockClear();
  });

  describe("@init", () => {
    it("should display all contents if signed in ", async () => {
      renderHome({ isSignedIn: true });
      expect(screen.getByText("📌 お知らせ")).toBeInTheDocument();
      expect(screen.getByText("ローディング中")).toBeInTheDocument();

      await waitFor(() => expect(areaRepository.readAll).toBeCalled());
      expect(areaRepository.readAll).toBeCalledTimes(1);
      expect(screen.queryByText("ローディング中")).not.toBeInTheDocument();

      expect(screen.getByText("📌 お知らせ")).toBeInTheDocument();
      expect(screen.getByText("🏞️ 温泉エリア一覧")).toBeInTheDocument();
      expect(screen.getByText("宮城県")).toBeInTheDocument();
      expect(screen.getByText("鳴子温泉")).toHaveAttribute("href", "/area/1");
      expect(screen.getByText("東鳴子温泉")).toHaveAttribute("href", "/area/2");
      expect(screen.getByText("西鳴子温泉")).toHaveAttribute("href", "/area/3");
      expect(screen.getByText("新潟県")).toBeInTheDocument();
      expect(screen.getByText("月岡温泉")).toHaveAttribute("href", "/area/4");
      expect(screen.getByText("沖縄県")).toBeInTheDocument();
      expect(screen.getByText("存在しない温泉")).toHaveAttribute(
        "href",
        "/area/7"
      );
    });

    it("should call create area if submit button is tapped", async () => {
      renderHome({ isSignedIn: true });

      await waitFor(() => expect(areaRepository.readAll).toBeCalled());

      const nameInput = screen.getByLabelText("名前");
      const kanaInput = screen.getByLabelText("カナ");
      const prefectureInput = screen.getByLabelText("都道府県");
      const villageInput = screen.getByLabelText("温泉郷");
      const urlInput = screen.getByLabelText("URL");
      const descriptionInput = screen.getByLabelText("説明");
      const accessInput = screen.getByLabelText("アクセス");
      await userEvent.type(nameInput, "新しい");
      await userEvent.type(kanaInput, "あたらしい");
      await userEvent.type(prefectureInput, "新潟県");
      await userEvent.type(villageInput, "素晴らし");
      await userEvent.type(urlInput, "https://www.example.com/");
      await userEvent.type(descriptionInput, "最高の温泉街です。");
      await userEvent.type(accessInput, "新しい温泉街へのアクセス");
      await userEvent.click(screen.getByText("送信"));

      expect(areaRepository.create).toBeCalledTimes(1);
    });

    it("should display all contents if not signed in ", async () => {
      renderHome({ isSignedIn: false });
      expect(screen.getByText("📌 お知らせ")).toBeInTheDocument();
      expect(screen.getByText("ローディング中")).toBeInTheDocument();

      await waitFor(() => expect(areaRepository.readAll).toBeCalled());
      expect(areaRepository.readAll).toBeCalledTimes(1);
      expect(screen.queryByText("ローディング中")).not.toBeInTheDocument();

      expect(screen.getByText("📌 お知らせ")).toBeInTheDocument();
      expect(screen.getByText("🏞️ 温泉エリア一覧")).toBeInTheDocument();
      expect(screen.getByText("宮城県")).toBeInTheDocument();
      expect(screen.getByText("鳴子温泉")).toHaveAttribute("href", "/area/1");
      expect(screen.getByText("東鳴子温泉")).toHaveAttribute("href", "/area/2");
      expect(screen.queryByText("西鳴子温泉")).not.toBeInTheDocument();
      expect(screen.getByText("新潟県")).toBeInTheDocument();
      expect(screen.getByText("月岡温泉")).toHaveAttribute("href", "/area/4");
      expect(screen.queryByText("沖縄県")).not.toBeInTheDocument();
      expect(screen.queryByText("存在しない温泉")).not.toBeInTheDocument();
    });
  });

  describe("@error", () => {
    it("should navigate to error page if loading is failed", async () => {
      areaRepository.readAll = vi.fn().mockRejectedValue(new Error("error"));
      renderHome({ isSignedIn: true });

      await waitFor(() => expect(areaRepository.readAll).toBeCalled());
      expect(useNavigateMock).toBeCalledWith("/error");
    });

    it("should navigate to error page if submitting is failed", async () => {
      areaRepository.create = vi.fn().mockRejectedValue(new Error("error"));
      renderHome({ isSignedIn: true });

      await waitFor(() => expect(areaRepository.readAll).toBeCalled());

      const nameInput = screen.getByLabelText("名前");
      const kanaInput = screen.getByLabelText("カナ");
      const prefectureInput = screen.getByLabelText("都道府県");
      const villageInput = screen.getByLabelText("温泉郷");
      const urlInput = screen.getByLabelText("URL");
      const descriptionInput = screen.getByLabelText("説明");
      const accessInput = screen.getByLabelText("アクセス");
      await userEvent.type(nameInput, "新しい");
      await userEvent.type(kanaInput, "あたらしい");
      await userEvent.type(prefectureInput, "新潟県");
      await userEvent.type(villageInput, "素晴らし");
      await userEvent.type(urlInput, "https://www.example.com/");
      await userEvent.type(descriptionInput, "最高の温泉街です。");
      await userEvent.type(accessInput, "新しい温泉街へのアクセス");
      await userEvent.click(screen.getByText("送信"));

      expect(areaRepository.create).toBeCalledTimes(1);
      expect(useNavigateMock).toBeCalledWith("/error");
    });
  });
});
