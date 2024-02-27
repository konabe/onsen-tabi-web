import styled from "styled-components";
import { subColor } from "../atoms/colors";

type Props = {
  children: React.ReactNode;
};

const Card: React.FC<Props> = ({ children }) => {
  return <Container>{children}</Container>;
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: 1px solid ${subColor};
  padding: 16px;
`;

export default Card;
