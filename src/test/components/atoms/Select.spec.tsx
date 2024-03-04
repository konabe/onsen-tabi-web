import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import selectEvent from "react-select-event";
import MySelect from "../../../components/atoms/Select";

// see. https://testing-library.com/docs/ecosystem-react-select-event/

describe("Select", () => {
  const onChange = vi.fn();

  beforeEach(() => {
    onChange.mockClear();
  });

  describe("Single", () => {
    it("should call onChange when selected", async () => {
      render(
        <MySelect
          label="選択肢"
          name="road"
          options={[
            { label: "選択なし", value: undefined },
            { label: "天国への道", value: "option1" },
            { label: "地獄への道", value: "option2" },
          ]}
          isMulti={false}
          value={undefined}
          defaultValue={undefined}
          onChange={onChange}
        />
      );
      const target = screen.getByLabelText("選択肢");
      await selectEvent.select(target, "天国への道");
      expect(onChange).toBeCalledWith(
        {
          label: "天国への道",
          value: "option1",
        },
        {
          action: "select-option",
          name: "road",
          option: undefined,
        }
      );
    });
  });

  describe("Multi", () => {
    it("should call onChange when selected", async () => {
      render(
        <MySelect
          label="選択肢"
          name="road"
          options={[
            { label: "選択なし", value: undefined },
            { label: "天国への道", value: "option1" },
            { label: "地獄への道", value: "option2" },
            { label: "バベルへの道", value: "option3" },
          ]}
          isMulti={true}
          value={[]}
          defaultValue={[]}
          onChange={onChange}
        />
      );
      const target = screen.getByLabelText("選択肢");
      await selectEvent.select(target, ["天国への道", "バベルへの道"]);
      expect(onChange).toHaveBeenNthCalledWith(
        1,
        [
          {
            label: "天国への道",
            value: "option1",
          },
        ],
        {
          action: "select-option",
          name: "road",
          option: {
            label: "天国への道",
            value: "option1",
          },
        }
      );
      expect(onChange).toHaveBeenNthCalledWith(
        2,
        [
          {
            label: "バベルへの道",
            value: "option3",
          },
        ],
        {
          action: "select-option",
          name: "road",
          option: {
            label: "バベルへの道",
            value: "option3",
          },
        }
      );
    });
  });
});
