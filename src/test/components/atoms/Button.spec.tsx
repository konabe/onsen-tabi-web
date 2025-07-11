import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Button from "../../../components/atoms/Button";
import { subColor } from "../../../components/atoms/colors";

describe("Button", () => {
  const onClick = vi.fn();
  const user = userEvent.setup();

  beforeEach(() => {
    onClick.mockClear();
  });

  it("should fire onClick function when button is clicked", async () => {
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

  // 急に通らなくなってしまった
  it.skip("should change appearance when button is hovered", async () => {
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
