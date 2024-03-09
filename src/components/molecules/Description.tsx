import styled from "styled-components";
import { grey1 } from "../atoms/colors";

type Props = {
  text?: string;
};

const Description: React.FC<Props> = ({ text }) => {
  const splittedDescription: string[] = (text ?? "").split("\n");

  return (
    <DescriptionContainer data-testid="description-container">
      {splittedDescription.map((v) => (
        <p key={v}>{v}</p>
      ))}
    </DescriptionContainer>
  );
};

export default Description;

const DescriptionContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 20px;

  background-color: ${grey1};
`;
