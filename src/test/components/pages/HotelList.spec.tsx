import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import HotelList from "../../../components/pages/HotelList";
import { HotelEntity } from "../../../domain/models/hotel";
import { HotelRepositoryMock } from "../../stubs/repositoryStubs";

const useNavigateMock = vi.fn();
vi.mock("react-router-dom", async (importOriginal) => {
  const actual: any = await importOriginal();
  return {
    ...actual,
    useNavigate: () => useNavigateMock,
  };
});

describe("HotelList", () => {
  const hotelRepository = HotelRepositoryMock();

  const renderHotelList = ({ isSignedIn }: { isSignedIn: boolean }) => {
    render(
      <MemoryRouter initialEntries={["/hotels"]}>
        <Routes>
          <Route
            path="/hotels"
            element={
              <HotelList
                isSignedIn={isSignedIn}
                dependencies={{ hotelRepository }}
              />
            }
          />
        </Routes>
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    hotelRepository.readAll = vi.fn().mockResolvedValue([
      new HotelEntity({
        id: 1,
        name: "伍楼閣",
        hasWashitsu: true,
        description: "まずはロビーの歴史を感じる雰囲気に圧倒される。",
        url: "https://www.gorokaku.com/",
      }),
      new HotelEntity({
        id: 2,
        name: "ホテル２",
        hasWashitsu: true,
        description: "いい感じのホテル",
        url: "https://www.example.com/iikanji",
      }),
    ]);
    useNavigateMock.mockClear();
    hotelRepository.create = vi.fn();
  });

  describe("@init", () => {
    it("should be displayed if signed in", async () => {
      renderHotelList({ isSignedIn: true });
      expect(screen.getByText("ローディング中")).toBeInTheDocument();

      await waitFor(() => expect(hotelRepository.readAll).toBeCalled());
      expect(hotelRepository.readAll).toBeCalledTimes(1);
      expect(screen.queryByText("ローディング中")).not.toBeInTheDocument();

      // loaded
      expect(screen.getByText("🏕️ 宿一覧")).toBeInTheDocument();
      expect(screen.getByText("伍楼閣")).toBeInTheDocument();
      expect(
        screen.getByText("まずはロビーの歴史を感じる雰囲気に圧倒される。")
      ).toBeInTheDocument();
      expect(screen.getByText("ホテル２")).toBeInTheDocument();
      expect(screen.getByText("いい感じのホテル")).toBeInTheDocument();
      //form
      expect(screen.getByText("ホテルの追加")).toBeInTheDocument();
      const nameField = screen.getByLabelText("名前");
      const hasWashitsuCheckbox = screen.getByLabelText("和室あり");
      const urlField = screen.getByLabelText("URL");
      const descriptionField = screen.getByLabelText("説明");
      const submitButton = screen.getByRole("button", { name: "送信" });
      expect(nameField).toBeInTheDocument();
      expect(hasWashitsuCheckbox).toBeInTheDocument();
      expect(urlField).toBeInTheDocument();
      expect(descriptionField).toBeInTheDocument();
      expect(submitButton).toBeInTheDocument();
      //submit
      await userEvent.type(nameField, "新しいホテル");
      await userEvent.click(hasWashitsuCheckbox);
      await userEvent.type(urlField, "https://www.example.com/new");
      await userEvent.type(descriptionField, "新しいホテルです。");
      await userEvent.click(submitButton);

      expect(hotelRepository.create).toBeCalledWith(
        new HotelEntity({
          id: -1,
          name: "新しいホテル",
          hasWashitsu: false,
          description: "新しいホテルです。",
          url: "https://www.example.com/new",
        })
      );
      expect(nameField).toHaveValue("");
      expect(hasWashitsuCheckbox).toBeChecked();
      expect(urlField).toHaveValue("");
      expect(descriptionField).toHaveValue("");
    });

    it("should be displayed if not signed in", async () => {
      renderHotelList({ isSignedIn: false });
      expect(screen.getByText("ローディング中")).toBeInTheDocument();

      await waitFor(() => {
        expect(hotelRepository.readAll).toBeCalled();
      });
      expect(hotelRepository.readAll).toBeCalledTimes(1);
      expect(screen.queryByText("ローディング中")).not.toBeInTheDocument();

      // loaded
      expect(screen.getByText("🏕️ 宿一覧")).toBeInTheDocument();
      expect(screen.getByText("伍楼閣")).toBeInTheDocument();
      expect(
        screen.getByText("まずはロビーの歴史を感じる雰囲気に圧倒される。")
      ).toBeInTheDocument();
      expect(screen.getByText("ホテル２")).toBeInTheDocument();
      expect(screen.getByText("いい感じのホテル")).toBeInTheDocument();

      expect(screen.queryByText("ホテルの追加")).not.toBeInTheDocument();
    });

    describe("@error", () => {
      it("should go error page if loading is failed", async () => {
        hotelRepository.readAll = vi.fn().mockRejectedValue(new Error("error"));
        renderHotelList({ isSignedIn: false });
        expect(screen.getByText("ローディング中")).toBeInTheDocument();

        await waitFor(() => expect(hotelRepository.readAll).toBeCalled());
        expect(hotelRepository.readAll).toBeCalledTimes(1);
        expect(screen.queryByText("ローディング中")).not.toBeInTheDocument();

        expect(useNavigateMock).toBeCalledWith("/error");
      });

      it("should go error page if submitting is failed", async () => {
        hotelRepository.create = vi.fn().mockRejectedValue(new Error("error"));
        renderHotelList({ isSignedIn: true });
        expect(screen.getByText("ローディング中")).toBeInTheDocument();

        await waitFor(() => {
          expect(hotelRepository.readAll).toBeCalled();
        });
        expect(hotelRepository.readAll).toBeCalledTimes(1);
        expect(screen.queryByText("ローディング中")).not.toBeInTheDocument();

        const nameField = screen.getByLabelText("名前");
        const hasWashitsuCheckbox = screen.getByLabelText("和室あり");
        const urlField = screen.getByLabelText("URL");
        const descriptionField = screen.getByLabelText("説明");
        const submitButton = screen.getByRole("button", { name: "送信" });
        expect(nameField).toBeInTheDocument();
        expect(hasWashitsuCheckbox).toBeInTheDocument();
        expect(urlField).toBeInTheDocument();
        expect(descriptionField).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
        //submit
        await userEvent.type(nameField, "新しいホテル");
        await userEvent.click(hasWashitsuCheckbox);
        await userEvent.type(urlField, "https://www.example.com/new");
        await userEvent.type(descriptionField, "新しいホテルです。");
        await userEvent.click(submitButton);

        expect(useNavigateMock).toBeCalledWith("/error");
      });
    });
  });
});
