import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "../../../components/atoms/Button";
describe("Button", () => {
  it("should fire onClick function when button is clicked", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button title="Click me" onClick={onClick}></Button>);
    const target = screen.getByRole("button");
    await user.click(target);
    expect(onClick).toBeCalledTimes(1);
  });
});
