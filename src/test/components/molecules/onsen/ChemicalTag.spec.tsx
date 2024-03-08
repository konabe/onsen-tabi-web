import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ChemicalTag from "../../../../components/molecules/onsen/ChemicalTag";
import { ChemicalTagModel } from "../../../../domain/models/onsen/chemicalTagModel";

describe("ChemicalTag", () => {
  it("should be tested", () => {
    render(<ChemicalTag chemical={new ChemicalTagModel("NaIon")} />);
    const target = screen.getByText("ナトリウムイオン");
    expect(target).toHaveTextContent("ナトリウムイオン");
    expect(target).toHaveStyle({
      backgroundColor: "#915c8b",
      color: "white",
      fontSize: "12px",
    });
  });

  it("should be omitted", () => {
    render(
      <ChemicalTag chemical={new ChemicalTagModel("NaIon")} isOmitted={true} />
    );
    const target = screen.getByText("ナ");
    expect(target).toHaveTextContent("ナ");
    expect(target).toHaveStyle({
      backgroundColor: "#915c8b",
      color: "white",
      fontSize: "12px",
    });
  });
});
