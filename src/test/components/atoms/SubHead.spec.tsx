import { render, screen } from "@testing-library/react";

import { subColor } from "../../../components/atoms/colors";
import SubHead from "../../../components/atoms/SubHead";

describe("SubHead", () => {
  it("should be displayed", () => {
    render(<SubHead title="温泉一覧" />);
    const target = screen.getByRole("heading", { level: 2 });
    expect(target).toHaveTextContent("温泉一覧");
    expect(target).toHaveStyle({
      color: `${subColor}`,
      fontSize: "20px",
      fontWeight: "400",
    });
  });
});
