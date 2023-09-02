import Select, { GroupBase, OptionsOrGroups } from "react-select";
import { mainColor, subColor } from "./colors";
import styled from "styled-components";

type Props = {
  label?: string;
  options: OptionsOrGroups<any, GroupBase<any>>;
  value: any;
  defaultValue: any;
  onChange: (v: any) => void;
};

const MySelect: React.FC<Props> = ({
  label,
  options,
  value,
  defaultValue,
  onChange,
}) => {
  const selectEl = (
    <Select
      options={options}
      value={value}
      defaultValue={defaultValue}
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
      <SLabel>
        {label}
        {selectEl}
      </SLabel>
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
