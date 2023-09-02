import styled from "styled-components";
import { mainColor } from "./colors";

type Props = {
  value: boolean;
  onChange: (value: boolean) => void;
};

const SingleCheckBox: React.FC<Props> = ({ value, onChange }) => {
  return (
    <SLabel>
      和室あり
      <SInput
        type="checkbox"
        checked={value}
        onChange={() => onChange(!value)}
      />
    </SLabel>
  );
};

export default SingleCheckBox;

const SLabel = styled.label`
  font-size: 12px;

  &:focus-within {
    color: ${mainColor};
  }
`;

const SInput = styled.input`
  accent-color: ${mainColor};
  margin-left: 5px;
  transform: scale(1.5);
`;
