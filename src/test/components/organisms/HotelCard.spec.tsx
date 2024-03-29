import { render, screen } from "@testing-library/react";

import HotelCard from "../../../components/organisims/HotelCard";
import { HotelEntity } from "../../../domain/models/hotel";

describe("HotelCard", () => {
  it("should be displayed", () => {
    render(
      <HotelCard
        hotel={
          new HotelEntity({
            id: -1,
            name: "伍楼閣",
            hasWashitsu: true,
            soloAvailable: false,
            url: "https://www.gorokaku.com/",
            description: "いい感じの温泉宿です。",
          })
        }
      />
    );
    const link = screen.getByText("🔗");
    expect(screen.getByText("伍楼閣")).toBeInTheDocument();
    expect(screen.getByText("いい感じの温泉宿です。")).toBeInTheDocument();
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", "https://www.gorokaku.com/");
  });
});
