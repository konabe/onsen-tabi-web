import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SubHead from "../../../components/atoms/SubHead";
import { subColor } from "../../../components/atoms/colors";

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
