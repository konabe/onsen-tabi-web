import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import NavBar from "../../../components/molecules/NavBar";
import NavItem from "../../../components/molecules/NavItem";
import { subColor } from "../../../components/atoms/colors";
import { MemoryRouter } from "react-router-dom";

describe("NavBar", () => {
  it("should be tested", () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: "/" }]}>
        <NavBar
          leftNav={<NavItem text="左メニュー" path="/left-path" />}
          rightNav={<NavItem text="右メニュー" path="/right-path" />}
        />
      </MemoryRouter>
    );
    const leftNav = screen.getByText("左メニュー");
    expect(leftNav).toBeInTheDocument();
    const rightNav = screen.getByText("右メニュー");
    expect(rightNav).toBeInTheDocument();
    expect(screen.getByTestId("nav-bar")).toHaveStyle({
      backgroundColor: subColor,
    });
  });
});
