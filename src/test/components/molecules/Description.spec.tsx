import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { grey1 } from "../../../components/atoms/colors";
import Description from "../../../components/molecules/Description";

describe("Description", () => {
  it("renders text", () => {
    render(<Description text={"Hello\nWorld"} />);
    // '\n'で分割されていない限りこれは正しくならない
    expect(screen.getByText("Hello")).toHaveTextContent("Hello");
    expect(screen.getByText("World")).toHaveTextContent("World");
    expect(screen.getByTestId("description-container")).toHaveStyle({
      backgroundColor: grey1,
    });
  });
});
