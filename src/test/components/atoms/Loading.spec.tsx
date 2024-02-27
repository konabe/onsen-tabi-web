import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Loading from "../../../components/atoms/Loading";
import { act } from "react-dom/test-utils";

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
    expect(screen.getByRole("loading-container").children[0].textContent).toBe(
      " ローディング中 "
    );
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(screen.getByRole("loading-container").children[0].textContent).toBe(
      ". ローディング中 ."
    );
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(screen.getByRole("loading-container").children[0].textContent).toBe(
      ".. ローディング中 .."
    );
    Array(7)
      .fill(0)
      .forEach(() => {
        act(() => {
          vi.advanceTimersByTime(300);
        });
      });
    expect(screen.getByRole("loading-container").children[0].textContent).toBe(
      "......... ローディング中 ........."
    );
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(screen.getByRole("loading-container").children[0].textContent).toBe(
      ".......... ローディング中 .........."
    );
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(screen.getByRole("loading-container").children[0].textContent).toBe(
      " ローディング中 "
    );
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(screen.getByRole("loading-container").children[0].textContent).toBe(
      ". ローディング中 ."
    );
  });
});
