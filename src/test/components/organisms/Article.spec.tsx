import { render, screen } from "@testing-library/react";

import Article from "../../../components/organisims/Article";

describe("Article", () => {
  it("should be displayed", () => {
    render(
      <Article emoji="📌" title="ブックマーク">
        <div>ブックマークの内容</div>
      </Article>
    );
    expect(screen.getByText("📌 ブックマーク")).toBeInTheDocument();
    expect(screen.getByText("ブックマークの内容")).toBeInTheDocument();
  });
});
