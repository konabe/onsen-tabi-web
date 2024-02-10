import styled from "styled-components";
import { subColor } from "./colors";

type Props = {
  emoji: HeadEmoji;
  title: string;
};

type HeadEmoji = "📌" | "🛏" | "♨" | "🏞";

const Head: React.FC<Props> = ({ emoji, title }) => {
  return (
    <SHead>
      {emoji} {title}
    </SHead>
  );
};

export default Head;

const SHead = styled.h1`
  color: ${subColor};
`;
