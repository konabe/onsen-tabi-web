import styled from "styled-components";
import { subColor } from "./colors";

type Props = {
  title: string;
};

const SubHead: React.FC<Props> = ({ title }) => {
  return <SH2>{title}</SH2>;
};

export default SubHead;

const SH2 = styled.h2`
  margin-bottom: 8px;
  color: ${subColor};
  font-size: 20px;
  font-family: "BIZ UDPMincho";
  font-weight: 400;
`;
