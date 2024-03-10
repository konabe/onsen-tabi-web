import { render, screen } from "@testing-library/react";

import Header from "../../../components/organisims/Header";

describe("Header", () => {
  it("should be displayed", () => {
    render(<Header />);
    const img = screen.getByAltText("サイトアイコン");
    expect(screen.getByText("静かに温泉旅がしたい！")).toBeInTheDocument();
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "/img/logo.png");
  });
});
