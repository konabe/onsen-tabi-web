import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Tag from "../../../components/atoms/Tag";
import { mainColor } from "../../../components/atoms/colors";

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
