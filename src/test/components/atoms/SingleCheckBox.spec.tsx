import { render, screen } from "@testing-library/react";
import { beforeEach } from "node:test";
import { describe, expect, it, vi } from "vitest";
import SingleCheckBox from "../../../components/atoms/SingleCheckBox";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

describe("SingleCheckBox", () => {
  const onChange = vi.fn();

  beforeEach(() => {
    onChange.mockClear();
  });

  it("should draw checkbox state", () => {
    render(<SingleCheckBox value={true} onChange={onChange} />);
    const target = screen.getByRole("checkbox");
    expect(target).toBeChecked();
    expect(onChange).not.toBeCalled();
  });

  it("should draw checkbox state", () => {
    render(<SingleCheckBox value={false} onChange={onChange} />);
    const target = screen.getByRole("checkbox");
    expect(target).not.toBeChecked();
    expect(onChange).not.toBeCalled();
  });
});
