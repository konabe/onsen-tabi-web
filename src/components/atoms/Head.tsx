import styled from "styled-components";
import { subColor } from "./colors";

type Props = {
  emoji: HeadEmoji;
  title: string;
};

export type HeadEmoji = "📌" | "🏕️" | "♨" | "🏞️";

const Head: React.FC<Props> = ({ emoji, title }) => {
  return (
    <SH1>
      {emoji} {title}
    </SH1>
  );
};

export default Head;

const SH1 = styled.h1`
  margin-bottom: 16px;
  color: ${subColor};
  font-size: 24px;
  font-family: "BIZ UDPMincho";
  font-weight: 400;
`;
