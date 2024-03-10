import styled from "styled-components";

import SubHead from "../atoms/SubHead";

const RelatedContents: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => {
  return (
    <SContainer>
      <div>
        <SubHead title={title} />
      </div>
      <div>{children}</div>
    </SContainer>
  );
};

export default RelatedContents;

const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
`;
