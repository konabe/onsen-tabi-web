import styled from "styled-components";

type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => {};
};

const TextArea: React.FC<Props> = ({ value, onChange }) => {
  return (
    <STextArea
      value={value}
      onChange={(e) => onChange(e)}
      rows={10}
    ></STextArea>
  );
};

export default TextArea;

const STextArea = styled.textarea`
  box-sizing: border-box;
  width: 100%;
  font-size: 16px;
  padding: 0.5em;
  resize: none;
`;
