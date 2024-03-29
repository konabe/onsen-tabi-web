import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import Loading from "../../../components/atoms/Loading";

vi.useFakeTimers({ shouldAdvanceTime: true });

describe("Loading", () => {
  beforeEach(() => {
    vi.clearAllTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be displayed on loop", () => {
    act(() => {
      render(<Loading />);
    });
    let target = screen.getByTestId("loading-container");
    expect(target).toHaveTextContent("ローディング中");
    act(() => {
      vi.advanceTimersByTime(300);
    });
    target = screen.getByTestId("loading-container");
    expect(target).toHaveTextContent(". ローディング中 .");
    act(() => {
      vi.advanceTimersByTime(300);
    });
    target = screen.getByTestId("loading-container");
    expect(target).toHaveTextContent(".. ローディング中 ..");
    Array(7)
      .fill(0)
      .forEach(() => {
        act(() => {
          vi.advanceTimersByTime(300);
        });
      });
    target = screen.getByTestId("loading-container");
    expect(target).toHaveTextContent("......... ローディング中 .........");
    act(() => {
      vi.advanceTimersByTime(300);
    });
    target = screen.getByTestId("loading-container");
    expect(target).toHaveTextContent(".......... ローディング中 ..........");
    act(() => {
      vi.advanceTimersByTime(300);
    });
    target = screen.getByTestId("loading-container");
    expect(target).toHaveTextContent("ローディング中");
    act(() => {
      vi.advanceTimersByTime(300);
    });
    target = screen.getByTestId("loading-container");
    expect(target).toHaveTextContent(". ローディング中 .");
  });
});
