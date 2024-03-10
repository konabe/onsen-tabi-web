import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import "@testing-library/jest-dom";

import { mainColor } from "../../../components/atoms/colors";
import Tag from "../../../components/atoms/Tag";

describe("Tag", () => {
  it("should be displayed", () => {
    render(<Tag text="温泉" />);
    const target = screen.getByText("温泉");
    expect(target).toHaveTextContent("温泉");
    expect(target).toHaveStyle({
      backgroundColor: mainColor,
      color: "white",
      fontSize: "12px",
    });
  });

  it("should be displayed when color is given", () => {
    render(<Tag text="温泉" hexColor="#112233" />);
    const target = screen.getByText("温泉");
    expect(target).toHaveTextContent("温泉");
    expect(target).toHaveStyle({
      backgroundColor: "#112233",
      color: "white",
      fontSize: "12px",
    });
  });
});
