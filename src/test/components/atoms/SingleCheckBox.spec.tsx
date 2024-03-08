import { render, screen } from "@testing-library/react";
import { beforeEach } from "node:test";
import { describe, expect, it, vi } from "vitest";
import SingleCheckBox from "../../../components/atoms/SingleCheckBox";

describe("SingleCheckBox", () => {
  const onChange = vi.fn();

  beforeEach(() => {
    onChange.mockClear();
  });

  it("should draw checkbox state", () => {
    render(
      <SingleCheckBox label="チェックする" value={true} onChange={onChange} />
    );
    const target = screen.getByRole("checkbox");
    expect(target).toBeChecked();
    expect(onChange).not.toBeCalled();
  });

  it("should draw checkbox state", () => {
    render(
      <SingleCheckBox label="チェックする" value={false} onChange={onChange} />
    );
    const target = screen.getByRole("checkbox");
    expect(target).not.toBeChecked();
    expect(onChange).not.toBeCalled();
  });

  it("should draw checkbox even if it has not label", () => {
    render(<SingleCheckBox value={false} onChange={onChange} />);
    const target = screen.getByRole("checkbox");
    expect(target).not.toBeChecked();
    expect(onChange).not.toBeCalled();
  });
});