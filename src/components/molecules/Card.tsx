import styled from "styled-components";

import { subColor } from "../atoms/colors";

type Props = {
  children: React.ReactNode;
  img?: {
    url: string;
    link?: string;
  };
};

const Card: React.FC<Props> = ({ children, img }) => {
  return (
    <Container>
      {img && (
        <ImgAnchor href={img.link}>
          <CoverImg src={img.url} />
        </ImgAnchor>
      )}
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

const ImgAnchor = styled.a`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const CoverImg = styled.img`
  height: 100px;
  object-fit: cover;
`;

export default Card;
