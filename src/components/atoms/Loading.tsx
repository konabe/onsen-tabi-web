import { useEffect, useState } from "react";
import { useInterval } from "react-use";
import styled from "styled-components";

const Loading: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [periods, setPeriods] = useState<string>("");
  const loadingText = "ローディング中";

  useEffect(() => {
    setPeriods(Array(count).fill(".").join(""));
  }, [count]);

  useInterval(() => {
    rotateCount();
  }, 300);

  const rotateCount = () => {
    if (count >= 10) {
      setCount(0);
      return;
    }
    setCount(count + 1);
  };

  return (
    <SContainer role="loading-container">
      <SText>{`${periods} ${loadingText} ${periods}`}</SText>
    </SContainer>
  );
};

export default Loading;

const SContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  width: 100%;
  text-align: center;
`;

const SText = styled.span`
  font-size: 20px;
`;
