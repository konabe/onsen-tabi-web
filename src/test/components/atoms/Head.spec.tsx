import { render, screen } from "@testing-library/react";

import { subColor } from "../../../components/atoms/colors";
import Head from "../../../components/atoms/Head";

describe("Head", () => {
  it("should be displayed", () => {
    render(<Head title="温泉一覧" emoji="♨" />);
    const target = screen.getByRole("heading", {
      level: 1,
      name: "♨ 温泉一覧",
    });
    expect(target).toHaveTextContent("♨ 温泉一覧");
    expect(target).toHaveStyle({
      color: `${subColor}`,
      fontSize: "24px",
      fontWeight: "400",
    });
  });
});
