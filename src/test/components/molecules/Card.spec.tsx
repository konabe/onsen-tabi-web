import { render, screen } from "@testing-library/react";

import Card from "../../../components/molecules/Card";

describe("Card", () => {
  it("should be displayed", () => {
    render(
      <Card imgUrl="https://placehold.jp/150x150.png">
        <div>コンテンツ</div>
      </Card>
    );
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      "https://placehold.jp/150x150.png"
    );
    expect(screen.getByText("コンテンツ")).toBeInTheDocument();
  });

  it("should display without cover image when imgUrl is not given", () => {
    render(
      <Card>
        <div>コンテンツ</div>
      </Card>
    );
    expect(screen.queryByRole("img")).toBeNull();
    expect(screen.getByText("コンテンツ")).toBeInTheDocument();
  });
});
