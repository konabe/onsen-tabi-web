import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import Signin from "../../../components/pages/Signin";
import { UserRepositoryMock } from "../../stubs/repositoryStubs";

const useNavigateMock = vi.fn();
vi.mock("react-router-dom", async (importOriginal) => {
  const actual: any = await importOriginal();
  return {
    ...actual,
    useNavigate: () => useNavigateMock,
  };
});

describe("Signin", () => {
  const userRepository = UserRepositoryMock();
  const onChangeToken = vi.fn();

  const renderSignin = () => {
    render(
      <MemoryRouter initialEntries={["/signin"]}>
        <Routes>
          <Route
            path="/signin"
            element={
              <Signin
                onChangeToken={onChangeToken}
                dependencies={{
                  userRepository,
                }}
              />
            }
          />
        </Routes>
      </MemoryRouter>
    );
  };

  describe("@init", () => {
    it("should be displayed", () => {
      renderSignin();
      expect(screen.getByLabelText("メールアドレス")).toBeInTheDocument();
      expect(screen.getByLabelText("パスワード")).toBeInTheDocument();
      expect(screen.getByText("ログイン")).toBeInTheDocument();
      expect(screen.getByText("ログアウト")).toBeInTheDocument();
    });

    it("should call signin when sign in button is clicked", async () => {
      userRepository.signIn = vi.fn().mockResolvedValue("token");
      renderSignin();
      await userEvent.type(
        screen.getByLabelText("メールアドレス"),
        "user@example.com"
      );
      await userEvent.type(
        screen.getByLabelText("パスワード"),
        "Password1234~@#"
      );
      await userEvent.click(screen.getByText("ログイン"));
      await waitFor(() => expect(onChangeToken).toHaveBeenCalledWith("token"));
      expect(useNavigateMock).toHaveBeenCalledWith("/");
    });

    it("should fire onChangeToken with undefined when sign out button is clicked", async () => {
      renderSignin();
      await userEvent.click(screen.getByText("ログアウト"));
      await waitFor(() =>
        expect(onChangeToken).toHaveBeenCalledWith(undefined)
      );
    });
  });
});
