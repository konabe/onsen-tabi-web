import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

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

  it("should call onChange when checkbox is checked", async () => {
    render(
      <SingleCheckBox label="チェックする" value={false} onChange={onChange} />
    );
    const target = screen.getByLabelText("チェックする");
    expect(target).not.toBeChecked();
    await userEvent.click(target);
    expect(onChange).toHaveBeenLastCalledWith(true);
    // NOTE: ステートとして持っていないので二回目は確認できない
    // NOTE: expect(target).toBeChecked(); も確認不可。
  });

  it("should call onChange when checkbox is unchecked", async () => {
    render(
      <SingleCheckBox label="チェックする" value={true} onChange={onChange} />
    );
    const target = screen.getByLabelText("チェックする");
    expect(target).toBeChecked();
    await userEvent.click(target);
    expect(onChange).toHaveBeenLastCalledWith(false);
    // NOTE: ステートとして持っていないので二回目は確認できない
    // NOTE: expect(target).toBeChecked(); も確認不可。
  });

  it("should draw checkbox even if it has not label", () => {
    render(
      <SingleCheckBox value={false} onChange={onChange} label={undefined} />
    );
    const target = screen.getByRole("checkbox");
    expect(target).not.toBeChecked();
    expect(onChange).not.toBeCalled();
  });
});
