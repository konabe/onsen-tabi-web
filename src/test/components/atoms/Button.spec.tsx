import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Button from "../../../components/atoms/Button";
import { mainColor, subColor } from "../../../components/atoms/colors";

describe("Button", () => {
  let onClick = vi.fn();

  beforeEach(() => {
    onClick.mockClear();
  });

  it("should fire onClick function when button is clicked", async () => {
    const user = userEvent.setup();
    render(<Button title="送信" onClick={onClick}></Button>);
    const target = screen.getByRole("button", { name: "送信" });
    await user.click(target);
    expect(target).toHaveTextContent("送信");
    expect(target).toHaveStyle({
      backgroundColor: `${subColor}`,
      color: "white",
    });
    expect(onClick).toBeCalledTimes(1);
  });

  it("should change appearance when button is hovered", async () => {
    const user = userEvent.setup();
    render(<Button title="送信" onClick={onClick}></Button>);
    const target = screen.getByRole("button", { name: "送信" });
    await user.hover(target);
    expect(target).toHaveTextContent("送信");
    expect(target).toHaveStyle({
      backgroundColor: `${subColor}`,
      color: "white",
      boxShadow: "0px 0px 8px black",
    });
    expect(onClick).toBeCalledTimes(0);
  });
});
