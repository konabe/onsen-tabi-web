import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SubHead from "../../../components/atoms/SubHead";

describe("SubHead", () => {
  it("should be displayed", () => {
    render(<SubHead title="温泉一覧" />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "温泉一覧"
    );
  });
});
