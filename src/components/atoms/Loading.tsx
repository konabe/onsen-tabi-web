import { useState } from "react";
import styled from "styled-components";

const Loading: React.FC = () => {
  const [periodCount, setPeriodCount] = useState<number>(0);
  setInterval(() => {
    if (periodCount >= 10) {
      setPeriodCount(0);
      return;
    }
    setPeriodCount(periodCount + 1);
  }, 300);
  return (
    <SContainer>
      <SText>
        {Array(periodCount).fill(".")} ローディング中{" "}
        {Array(periodCount).fill(".")}
      </SText>
    </SContainer>
  );
};

export default Loading;

const SContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  width: 100vw;
  text-align: center;
`;

const SText = styled.span`
  font-size: 20px;
`;
