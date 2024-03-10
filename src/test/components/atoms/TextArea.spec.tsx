import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { mainColor } from "../../../components/atoms/colors";
import TextArea from "../../../components/atoms/TextArea";

describe("TextArea", () => {
  const onChange = vi.fn();

  beforeEach(() => {
    onChange.mockClear();
  });

  it("fire events when typed", async () => {
    const user = userEvent.setup();
    render(<TextArea label="ラベル" value="" onChange={onChange} />);
    const target = screen.getByRole("textbox");
    expect(target).toHaveStyle({ fontSize: "16px", outlineColor: mainColor });
    await user.type(target, "温泉は素晴らしい");
    expect(onChange).toHaveBeenNthCalledWith(1, "温");
    expect(onChange).toHaveBeenNthCalledWith(2, "泉");
    expect(onChange).toHaveBeenNthCalledWith(3, "は");
    expect(onChange).toHaveBeenNthCalledWith(4, "素");
    expect(onChange).toHaveBeenNthCalledWith(5, "晴");
    expect(onChange).toHaveBeenNthCalledWith(6, "ら");
    expect(onChange).toHaveBeenNthCalledWith(7, "し");
    expect(onChange).toHaveBeenNthCalledWith(8, "い");
  });

  it("displays something even if it has no label", async () => {
    render(<TextArea value="" onChange={onChange} />);
    const target = screen.getByRole("textbox");
    expect(target).toHaveStyle({ fontSize: "16px", outlineColor: mainColor });
  });
});
