import styled from "styled-components";

import { mainColor } from "./colors";

type Props = {
  text: string;
  hexColor: string | undefined;
};

const Tag: React.FC<Props> = ({ text, hexColor: color }) => {
  const backgroundColor = color ?? mainColor;
  return <TagContainer style={{ backgroundColor }}>{text}</TagContainer>;
};

export default Tag;

const TagContainer = styled.div`
  display: inline-block;
  color: white;
  font-size: 12px;
  padding: 4px;
  box-sizing: border-box;
  white-space: nowrap;
`;
