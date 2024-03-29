import { render, screen } from "@testing-library/react";

import OnsenCard from "../../../components/organisims/OnsenCard";
import { OnsenEntity } from "../../../domain/models/onsen";

describe("OnsenCard", () => {
  it("should be displayed", () => {
    render(
      <OnsenCard
        onsen={
          new OnsenEntity({
            id: 1,
            name: "大滝乃湯",
            generatedSpringQuality: "ナトリウム塩化物泉",
            otherSpringQuality: "",
            chemicals: ["NaIon", "ClIon"],
            liquid: "mildly_alkaline",
            osmoticPressure: "isotonic",
            temperature: "hot",
            form: "sotoyu",
            isDayUse: true,
            url: "https://onsen-kusatsu.com/ohtakinoyu/",
            imgURL: "https://placehold.jp/150x150.png",
            description:
              "徐々に体を慣らしながら熱いお湯に浸かるための合わせ湯を楽しむことができる。",
            area: undefined,
          })
        }
      />
    );
    const link = screen.getByText("🔗");
    expect(screen.getByText("大滝乃湯")).toBeInTheDocument();
    expect(
      screen.getByText(
        "徐々に体を慣らしながら熱いお湯に浸かるための合わせ湯を楽しむことができる。"
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText("(等張性・弱アルカリ性・高温泉)")
    ).toBeInTheDocument();
    expect(screen.getByText("ナ")).toBeInTheDocument();
    expect(screen.getByText("塩")).toBeInTheDocument();
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute(
      "href",
      "https://onsen-kusatsu.com/ohtakinoyu/"
    );
  });
});
