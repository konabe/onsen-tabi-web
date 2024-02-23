import styled from "styled-components";
import { subColor } from "../atoms/colors";

const RelatedContents: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => {
  return (
    <div>
      <SH2>{title}</SH2>
      {children}
    </div>
  );
};
export default RelatedContents;

const SH2 = styled.h2`
  margin-bottom: 8px;
  color: ${subColor};
  font-size: 20px;
  font-family: "BIZ UDPMincho";
  font-weight: 400;
`;
