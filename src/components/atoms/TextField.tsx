import styled from "styled-components";

import { mainColor } from "./colors";

type Props = {
  label: string | undefined;
  value: string;
  onChange: (value: string) => void;
  autoComplete?: string;
  isPassword?: boolean;
};

const TextField: React.FC<Props> = ({
  label,
  value,
  onChange,
  autoComplete,
  isPassword,
}) => {
  const type = isPassword ?? false ? "password" : "text";
  const inputEl = (
    <SInput
      type={type}
      value={value}
      autoComplete={autoComplete}
      onChange={(e) => onChange(e.target.value)}
    />
  );
  if (label === undefined) {
    return inputEl;
  }
  return (
    <div>
      <SLabel>
        {label}
        {inputEl}
      </SLabel>
    </div>
  );
};

export default TextField;

const SInput = styled.input`
  border-style: solid;
  border-width: 1px;
  border-radius: 4px;
  font-size: 16px;

  padding: 0.5em;
  outline-color: ${mainColor};
`;

const SLabel = styled.label`
  font-size: 12px;
  display: flex;
  flex-direction: column;

  &:focus-within {
    color: ${mainColor};
  }
`;
