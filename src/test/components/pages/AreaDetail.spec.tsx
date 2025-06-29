import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router";

import AreaDetail from "../../../components/pages/AreaDetail";
import { AreaEntity } from "../../../domain/models/area";
import {
  AreaRepositoryMock,
  HotelRepositoryMock,
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

describe("AreaDetail", () => {
  const areaRepository = AreaRepositoryMock();
  const onsenRepository = OnsenRepositoryMock();
  const hotelRepository = HotelRepositoryMock();

  const renderAreaDetail = ({
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
            path="/area/:id"
            element={
              <AreaDetail
                isSignedIn={isSignedIn}
                dependencies={{
                  areaRepository,
                  onsenRepository,
                  hotelRepository,
                }}
              />
            }
          />
        </Routes>
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    areaRepository.read = vi.fn().mockResolvedValue(
      new AreaEntity({
        id: 0,
        name: "鳴子",
        kana: "なるこ",
        prefecture: "宮城県",
        nationalResort: true,
        village: "鳴子",
        url: "https://www.welcome-naruko.jp/",
        description: "鳴子温泉は、宮城県大崎市鳴子温泉にある温泉。",
        access: "鳴子温泉へのアクセス",
        onsenIds: [],
      })
    );
    onsenRepository.readAll = vi.fn().mockResolvedValue([]);
    hotelRepository.readAll = vi.fn().mockResolvedValue([]);
    areaRepository.update = vi.fn();
    useNavigateMock.mockClear();
  });

  describe("@init", () => {
    it("should render if signed in", async () => {
      renderAreaDetail({ path: "/area/123", isSignedIn: true });
      expect(screen.getByText("ローディング中")).toBeInTheDocument();

      await waitFor(() => expect(areaRepository.read).toBeCalled());
      await waitFor(() => expect(onsenRepository.readAll).toBeCalled());
      await waitFor(() => expect(hotelRepository.readAll).toBeCalled());
      expect(areaRepository.read).toBeCalledTimes(1);
      expect(areaRepository.read).toHaveBeenNthCalledWith(1, 123);
      expect(onsenRepository.readAll).toBeCalledTimes(1);
      expect(onsenRepository.readAll).toHaveBeenNthCalledWith(1, 123);
      expect(hotelRepository.readAll).toBeCalledTimes(1);
      expect(hotelRepository.readAll).toHaveBeenNthCalledWith(1, 123);
      expect(screen.queryByText("ローディング中")).not.toBeInTheDocument();

      // loaded
      expect(
        screen.getByText("🏞️ 鳴子温泉 (鳴子温泉郷、宮城県)")
      ).toBeInTheDocument();
      expect(screen.getByText("リンク")).toHaveAttribute(
        "href",
        "https://www.welcome-naruko.jp/"
      );
      expect(screen.getAllByText("国民保養温泉地")[0]).toBeInTheDocument();
      expect(
        screen.getAllByText("鳴子温泉は、宮城県大崎市鳴子温泉にある温泉。")[0]
      ).toBeInTheDocument();
      expect(
        screen.getAllByText("鳴子温泉へのアクセス")[0]
      ).toBeInTheDocument();
      // TODO: ホテルと温泉が空のときにタイトルが出ているのは変なので修正 「なし」と表示するのか、表示しないのか。
      expect(screen.getByText("ホテル")).toBeInTheDocument();
      expect(screen.getByText("温泉")).toBeInTheDocument();
      // form
      expect(screen.getByLabelText("名前")).toHaveValue("鳴子");
      expect(screen.getByLabelText("都道府県")).toHaveValue("宮城県");
      expect(screen.getByLabelText("温泉郷")).toHaveValue("鳴子");
      expect(screen.getByLabelText("URL")).toHaveValue(
        "https://www.welcome-naruko.jp/"
      );
      expect(screen.getByLabelText("国民保養温泉地")).toBeChecked();
      expect(screen.getByLabelText("説明")).toHaveValue(
        "鳴子温泉は、宮城県大崎市鳴子温泉にある温泉。"
      );

      // submit
      const submitButton = screen.getByText("送信");
      userEvent.click(submitButton);

      await waitFor(() => expect(areaRepository.update).toBeCalled());
      expect(areaRepository.update).toBeCalledTimes(1);
    });

    it.todo("should render with onsen and hotel");

    it("should render and if not signed in", async () => {
      renderAreaDetail({ path: "/area/123", isSignedIn: false });
      expect(screen.getByText("ローディング中")).toBeInTheDocument();

      await waitFor(() => expect(areaRepository.read).toBeCalled());
      await waitFor(() => expect(onsenRepository.readAll).toBeCalled());
      await waitFor(() => expect(hotelRepository.readAll).toBeCalled());
      expect(areaRepository.read).toBeCalledTimes(1);
      expect(areaRepository.read).toHaveBeenNthCalledWith(1, 123);
      expect(onsenRepository.readAll).toBeCalledTimes(1);
      expect(onsenRepository.readAll).toHaveBeenNthCalledWith(1, 123);
      expect(hotelRepository.readAll).toBeCalledTimes(1);
      expect(hotelRepository.readAll).toHaveBeenNthCalledWith(1, 123);
      expect(screen.queryByText("ローディング中")).not.toBeInTheDocument();

      // loaded
      expect(
        screen.getByText("🏞️ 鳴子温泉 (鳴子温泉郷、宮城県)")
      ).toBeInTheDocument();
      expect(screen.getByText("リンク")).toHaveAttribute(
        "href",
        "https://www.welcome-naruko.jp/"
      );
      expect(screen.getAllByText("国民保養温泉地")[0]).toBeInTheDocument();
      expect(
        screen.getAllByText("鳴子温泉は、宮城県大崎市鳴子温泉にある温泉。")[0]
      ).toBeInTheDocument();
      expect(
        screen.getAllByText("鳴子温泉へのアクセス")[0]
      ).toBeInTheDocument();
      // TODO: ホテルと温泉が空のときにタイトルが出ているのは変なので修正 「なし」と表示するのか、表示しないのか。
      expect(screen.getByText("ホテル")).toBeInTheDocument();
      expect(screen.getByText("温泉")).toBeInTheDocument();
      // form
      expect(screen.queryByLabelText("名前")).not.toBeInTheDocument();
    });
  });

  describe("@error", () => {
    it("should go error page if loading is failed", async () => {
      areaRepository.read = vi.fn().mockRejectedValue(new Error("error"));
      renderAreaDetail({ path: "/area/123", isSignedIn: false });
      expect(screen.getByText("ローディング中")).toBeInTheDocument();

      await waitFor(() => expect(areaRepository.read).toBeCalled());
      await waitFor(() => expect(onsenRepository.readAll).toBeCalled());
      await waitFor(() => expect(hotelRepository.readAll).toBeCalled());
      expect(areaRepository.read).toBeCalledTimes(1);
      expect(areaRepository.read).toHaveBeenNthCalledWith(1, 123);
      expect(onsenRepository.readAll).toBeCalledTimes(1);
      expect(onsenRepository.readAll).toHaveBeenNthCalledWith(1, 123);
      expect(hotelRepository.readAll).toBeCalledTimes(1);
      expect(hotelRepository.readAll).toHaveBeenNthCalledWith(1, 123);
      expect(screen.queryByText("ローディング中")).not.toBeInTheDocument();

      expect(useNavigateMock).toBeCalledWith("/error");
    });

    it("should go error page if updating is failed", async () => {
      areaRepository.update = vi.fn().mockRejectedValue(new Error("error"));
      renderAreaDetail({ path: "/area/123", isSignedIn: true });
      expect(screen.getByText("ローディング中")).toBeInTheDocument();

      await waitFor(() => expect(areaRepository.read).toBeCalled());
      await waitFor(() => expect(onsenRepository.readAll).toBeCalled());
      await waitFor(() => expect(hotelRepository.readAll).toBeCalled());
      expect(areaRepository.read).toBeCalledTimes(1);
      expect(areaRepository.read).toHaveBeenNthCalledWith(1, 123);
      expect(onsenRepository.readAll).toBeCalledTimes(1);
      expect(onsenRepository.readAll).toHaveBeenNthCalledWith(1, 123);
      expect(hotelRepository.readAll).toBeCalledTimes(1);
      expect(hotelRepository.readAll).toHaveBeenNthCalledWith(1, 123);
      expect(screen.queryByText("ローディング中")).not.toBeInTheDocument();

      const submitButton = screen.getByText("送信");
      userEvent.click(submitButton);

      await waitFor(() => expect(areaRepository.update).toBeCalled());
      expect(areaRepository.update).toBeCalledTimes(1);
      expect(useNavigateMock).toBeCalledWith("/error");
    });
  });
});
