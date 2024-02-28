import styled from "styled-components";
import { mainColor } from "./colors";

type Props = {
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => {};
};

const TextArea: React.FC<Props> = ({ label, value, onChange }) => {
  const textAreaEl = (
    <STextArea
      value={value}
      onChange={(e) => onChange(e)}
      rows={10}
    ></STextArea>
  );
  if (label === undefined) {
    return textAreaEl;
  }
  return (
    <div>
      <SLabel>
        {label}
        {textAreaEl}
      </SLabel>
    </div>
  );
};

export default TextArea;

const STextArea = styled.textarea`
  border-style: solid;
  border-width: 1px;
  border-radius: 4px;

  box-sizing: border-box;
  width: 100%;
  font-size: 16px;
  padding: 0.5em;
  outline-color: ${mainColor};
  resize: none;
`;

const SLabel = styled.label`
  font-size: 12px;
  display: flex;
  flex-direction: column;

  &:focus-within {
    color: ${mainColor};
  }
`;
