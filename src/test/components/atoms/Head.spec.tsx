import { describe, expect, it } from "vitest";
import Head from "../../../components/atoms/Head";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Head", () => {
  it("should be displayed", () => {
    render(<Head title="温泉一覧" emoji="♨" />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "♨ 温泉一覧"
    );
  });
});
