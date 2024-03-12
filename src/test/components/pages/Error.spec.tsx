import { render, screen } from "@testing-library/react";

import ErrorPage from "../../../components/pages/Error";

describe("Error", () => {
  it("should be displayed", () => {
    render(<ErrorPage />);
    expect(screen.getByText("Error!")).toBeInTheDocument();
  });
});
