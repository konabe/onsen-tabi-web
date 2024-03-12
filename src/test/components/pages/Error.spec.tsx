import { render, screen } from "@testing-library/react";

import Error from "../../../components/pages/Error";

describe("Error", () => {
  it("should be displayed", () => {
    render(<Error />);
    expect(screen.getByText("Error!")).toBeInTheDocument();
  });
});
