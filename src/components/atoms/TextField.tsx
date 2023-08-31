import styled from "styled-components";

type Props = {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete?: string;
};

const TextField: React.FC<Props> = ({
  label,
  value,
  onChange,
  autoComplete,
}) => {
  const inputEl = (
    <SInput
      type="text"
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

  padding: 6px 8px;
  outline-color: #56c198;
`;

const SLabel = styled.label`
  font-size: 12px;
  display: flex;
  flex-direction: column;

  &:focus-within {
    color: #56c198;
  }
`;
