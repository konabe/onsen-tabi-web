import Select, { GroupBase, OptionsOrGroups } from "react-select";
import styled from "styled-components";

import { mainColor, subColor } from "./colors";

type ValueType = any;
type Option = { key: string; value: string };

type Props = {
  label?: string;
  name: string;
  options: OptionsOrGroups<any, GroupBase<any>>;
} & (
  | {
      isMulti: false;
      value: ValueType;
      defaultValue: ValueType;
      onChange: (v: Option) => void;
    }
  | {
      isMulti: true;
      value: ValueType[];
      defaultValue: ValueType[];
      onChange: (v: Option[]) => void;
    }
);

const MySelect: React.FC<Props> = ({
  label,
  name,
  options,
  value,
  isMulti,
  defaultValue,
  onChange,
}) => {
  const selectEl = (
    <Select
      name={name}
      inputId={name}
      options={options}
      value={value}
      defaultValue={defaultValue}
      isMulti={isMulti ?? false}
      onChange={onChange}
      styles={{
        control: (provided, state) => ({
          ...provided,
          boxShadow: "none",
          borderColor: state.isFocused ? mainColor : "gray",
          fontSize: 16,
          outlineColor: mainColor,
          outlineWidth: 1,
          "&:hover": {
            borderColor: mainColor,
          },
        }),
        option: (provided, state) => {
          let backgroundColor = "inherit";
          if (state.isSelected) {
            backgroundColor = subColor;
          }
          if (state.isFocused) {
            backgroundColor = mainColor;
          }
          return {
            ...provided,
            color: state.isSelected ? "white" : "black",
            backgroundColor,
          };
        },
      }}
    />
  );
  if (label === undefined) {
    return selectEl;
  }
  return (
    <div>
      <SLabel htmlFor={name}>{label}</SLabel>
      {selectEl}
    </div>
  );
};

const SLabel = styled.label`
  font-size: 12px;
  display: flex;
  flex-direction: column;

  &:focus-within {
    color: ${mainColor};
  }
`;
export default MySelect;
