import styled from "styled-components";
import { mainColor } from "./colors";

type Props = {
  text: string;
  hexColor?: string;
};

const Tag: React.FC<Props> = ({ text, hexColor: color }) => {
  const backgroundColor = color ?? mainColor;
  return <STag style={{ backgroundColor }}>{text}</STag>;
};

export default Tag;

const STag = styled.span`
  display: inline-block;
  color: white;
  font-size: 12px;
  padding: 4px;
  box-sizing: border-box;
`;
