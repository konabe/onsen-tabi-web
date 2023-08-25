import styled from "styled-components";

type Props = {
  text?: string;
};

const Description: React.FC<Props> = ({ text }) => {
  const splittedDescription: string[] = (text ?? "").split("\n");

  return (
    <DescriptionContainer>
      {splittedDescription.map((v) => (
        <p key={v}>{v}</p>
      ))}
    </DescriptionContainer>
  );
};

export default Description;

const DescriptionContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 20px;
  background-color: #f5f5f5;
  width: 500px;
`;
