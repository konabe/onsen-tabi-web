import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import NavItem from "../../../components/molecules/NavItem";
import { subColor } from "../../../components/atoms/colors";
import { MemoryRouter } from "react-router-dom";

describe("NavBar", () => {
  it("should be displayed", () => {
    render(<NavItem text="左メニュー" path="/left-path" />, {
      wrapper: MemoryRouter,
    });
    const leftNav = screen.getByText("左メニュー");
    expect(leftNav).toBeInTheDocument();
    expect(leftNav).toHaveStyle({
      backgroundColor: subColor,
      color: "white",
    });
    // TODO: a11yの観点からリンクとテキストを分離しないようにする
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/left-path");
  });

  it.todo("should route when tapped");
});
