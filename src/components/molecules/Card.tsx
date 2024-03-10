import styled from "styled-components";

import { subColor } from "../atoms/colors";

type Props = {
  children: React.ReactNode;
  imgUrl?: string;
};

const Card: React.FC<Props> = ({ children, imgUrl }) => {
  return (
    <Container>
      {imgUrl && <CoverImg src={imgUrl} />}
      <BodyContainer>{children}</BodyContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
  border: 1px solid ${subColor};
`;

const BodyContainer = styled.div`
  padding: 16px;
  box-sizing: border-box;
`;

const CoverImg = styled.img`
  height: 100px;
  object-fit: cover;
`;

export default Card;
