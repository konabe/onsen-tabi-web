import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import HotelDetail from "../../../components/pages/HotelDetail";
import { HotelEntity } from "../../../domain/models/hotel";
import {
  HotelRepositoryMock,
  OnsenRepositoryMock,
} from "../../stubs/repositoryStubs";

const useNavigateMock = vi.fn();
vi.mock("react-router-dom", async (importOriginal) => {
  const actual: any = await importOriginal();
  return {
    ...actual,
    useNavigate: () => useNavigateMock,
  };
});

describe("HotelDetail", () => {
  const onsenRepository = OnsenRepositoryMock();
  const hotelRepository = HotelRepositoryMock();

  const renderHotelDetail = ({
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
            path="/hotel/:id"
            element={
              <HotelDetail
                isSignedIn={isSignedIn}
                dependencies={{
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
    hotelRepository.read = vi.fn().mockResolvedValue(
      new HotelEntity({
        id: 1,
        name: "伍楼閣",
        hasWashitsu: true,
        description: "まずはロビーの歴史を感じる雰囲気に圧倒される。",
        url: "http://www.gorokaku.com/",
      })
    );
    onsenRepository.readAll = vi.fn().mockResolvedValue([]);
    hotelRepository.readAll = vi.fn().mockResolvedValue([]);
    useNavigateMock.mockClear();
  });

  describe("@init", () => {
    it("should render if signed in", async () => {
      renderHotelDetail({ path: "/hotel/123", isSignedIn: true });
      expect(screen.getByText("ローディング中")).toBeInTheDocument();

      await waitFor(() => expect(hotelRepository.read).toBeCalled());
      await waitFor(() => expect(onsenRepository.readAll).toBeCalled());
      expect(onsenRepository.readAll).toBeCalledTimes(1);
      expect(onsenRepository.readAll).toHaveBeenNthCalledWith(
        1,
        undefined,
        123
      );
      expect(hotelRepository.read).toBeCalledTimes(1);
      expect(hotelRepository.read).toHaveBeenNthCalledWith(1, 123);
      expect(screen.queryByText("ローディング中")).not.toBeInTheDocument();

      // loaded
      expect(screen.getByText("🏕️ 伍楼閣")).toBeInTheDocument();
      expect(screen.getAllByText("和室あり")[0]).toBeInTheDocument();
      expect(screen.getByText("リンク")).toHaveAttribute(
        "href",
        "http://www.gorokaku.com/"
      );
      expect(
        screen.getAllByText("まずはロビーの歴史を感じる雰囲気に圧倒される。")
      ).toHaveLength(2);
      // TODO: ホテルと温泉が空のときにタイトルが出ているのは変なので修正 「なし」と表示するのか、表示しないのか。
      expect(screen.getByText("温泉")).toBeInTheDocument();
      // form
      expect(screen.getByLabelText("名前")).toHaveValue("伍楼閣");
      // FIXME: エラーになる
      // expect(screen.getAllByText("和室あり")[1]).toBeChecked();
      expect(screen.getByLabelText("URL")).toHaveValue(
        "http://www.gorokaku.com/"
      );
      expect(screen.getByLabelText("説明")).toHaveValue(
        "まずはロビーの歴史を感じる雰囲気に圧倒される。"
      );

      // submit
      const submitButton = screen.getByText("送信");
      userEvent.click(submitButton);

      await waitFor(() => expect(hotelRepository.update).toBeCalled());
      expect(hotelRepository.update).toBeCalledTimes(1);
    });

    it.todo("should render with onsen");

    it("should render and if not signed in", async () => {
      renderHotelDetail({ path: "/hotel/123", isSignedIn: false });
      expect(screen.getByText("ローディング中")).toBeInTheDocument();

      await waitFor(() => expect(hotelRepository.read).toBeCalled());
      await waitFor(() => expect(onsenRepository.readAll).toBeCalled());
      expect(onsenRepository.readAll).toBeCalledTimes(1);
      expect(onsenRepository.readAll).toHaveBeenNthCalledWith(
        1,
        undefined,
        123
      );
      expect(hotelRepository.read).toBeCalledTimes(1);
      expect(hotelRepository.read).toHaveBeenNthCalledWith(1, 123);
      expect(screen.queryByText("ローディング中")).not.toBeInTheDocument();

      // loaded
      expect(screen.getByText("🏕️ 伍楼閣")).toBeInTheDocument();
      expect(screen.getByText("和室あり")).toBeInTheDocument();
      expect(screen.getByText("リンク")).toHaveAttribute(
        "href",
        "http://www.gorokaku.com/"
      );
      expect(
        screen.getByText("まずはロビーの歴史を感じる雰囲気に圧倒される。")
      ).toBeInTheDocument();
      // TODO: ホテルと温泉が空のときにタイトルが出ているのは変なので修正 「なし」と表示するのか、表示しないのか。
      expect(screen.getByText("温泉")).toBeInTheDocument();
      // form
      expect(screen.queryByLabelText("名前")).not.toBeInTheDocument();
    });
  });

  describe("@error", () => {
    it("should go error page if loading is failed", async () => {
      hotelRepository.read = vi.fn().mockRejectedValue(new Error("error"));
      renderHotelDetail({ path: "/hotel/123", isSignedIn: false });
      expect(screen.getByText("ローディング中")).toBeInTheDocument();

      await waitFor(() => expect(hotelRepository.read).toBeCalled());
      await waitFor(() => expect(onsenRepository.readAll).toBeCalled());
      expect(onsenRepository.readAll).toBeCalledTimes(1);
      expect(onsenRepository.readAll).toHaveBeenNthCalledWith(
        1,
        undefined,
        123
      );
      expect(hotelRepository.read).toBeCalledTimes(1);
      expect(hotelRepository.read).toHaveBeenNthCalledWith(1, 123);
      expect(screen.queryByText("ローディング中")).not.toBeInTheDocument();

      expect(useNavigateMock).toBeCalledWith("/error");
    });

    it("should go error page if updating is failed", async () => {
      hotelRepository.update = vi.fn().mockRejectedValue(new Error("error"));
      renderHotelDetail({ path: "/hotel/123", isSignedIn: true });
      expect(screen.getByText("ローディング中")).toBeInTheDocument();

      await waitFor(() => expect(hotelRepository.read).toBeCalled());
      await waitFor(() => expect(onsenRepository.readAll).toBeCalled());
      expect(onsenRepository.readAll).toBeCalledTimes(1);
      expect(onsenRepository.readAll).toHaveBeenNthCalledWith(
        1,
        undefined,
        123
      );
      expect(hotelRepository.read).toBeCalledTimes(1);
      expect(hotelRepository.read).toHaveBeenNthCalledWith(1, 123);
      expect(screen.queryByText("ローディング中")).not.toBeInTheDocument();

      const submitButton = screen.getByText("送信");
      userEvent.click(submitButton);

      await waitFor(() => expect(hotelRepository.update).toBeCalled());
      expect(hotelRepository.update).toBeCalledTimes(1);
      expect(useNavigateMock).toBeCalledWith("/error");
    });
  });
});
