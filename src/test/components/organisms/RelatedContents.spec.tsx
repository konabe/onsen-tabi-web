import { render, screen } from "@testing-library/react";

import RelatedContents from "../../../components/organisims/RelatedContents";

describe("RelatedContents", () => {
  it("should be displayed", () => {
    render(
      <RelatedContents title="コンテンツタイトル">
        関連コンテンツの内容がここに来ます
      </RelatedContents>
    );
    expect(screen.getByText("コンテンツタイトル")).toBeInTheDocument();
    expect(
      screen.getByText("関連コンテンツの内容がここに来ます")
    ).toBeInTheDocument();
  });
});
