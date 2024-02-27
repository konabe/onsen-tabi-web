import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Button from "../../../components/atoms/Button";

describe("Button", () => {
  let onClick = vi.fn();

  beforeEach(() => {
    onClick.mockClear();
  });

  it("should fire onClick function when button is clicked", async () => {
    const user = userEvent.setup();
    render(<Button title="送信" onClick={onClick}></Button>);
    const target = screen.getByRole("button");
    await user.click(target);
    expect(screen.getByRole("button")).toHaveTextContent("送信");
    expect(onClick).toBeCalledTimes(1);
  });
});
