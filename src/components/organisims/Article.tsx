import styled from "styled-components";
import Head, { HeadEmoji } from "../atoms/Head";

const Article: React.FC<{
  emoji: HeadEmoji;
  title: string;
  children: React.ReactNode;
}> = ({ emoji, title, children }) => {
  return (
    <SContainer>
      <div>
        <Head emoji={emoji} title={title} />
      </div>
      <div>{children}</div>
    </SContainer>
  );
};
export default Article;

const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0px; // h2のマージンを消す
`;
