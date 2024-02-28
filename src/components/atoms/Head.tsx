import styled from "styled-components";
import { subColor } from "./colors";

type Props = {
  emoji: HeadEmoji;
  title: string;
};

export type HeadEmoji = "📌" | "🏕️" | "♨" | "🏞️";

const Head: React.FC<Props> = ({ emoji, title }) => {
  const text = `${emoji} ${title}`;
  return <SH1>{text}</SH1>;
};

export default Head;

const SH1 = styled.h1`
  color: ${subColor};
  font-size: 24px;
  font-family: "BIZ UDPMincho";
  font-weight: 400;
`;
