import styled from "styled-components";

import { HotelEntity } from "../../domain/models/hotel";
import { subColor } from "../atoms/colors";
import Card from "../molecules/Card";

type Props = {
  hotel: HotelEntity;
};

const HotelCard: React.FC<Props> = ({ hotel }) => {
  return (
    <Card>
      <Container>
        <Header>
          <NameContainer>
            <a href={`/hotel/${hotel.id}`}>{hotel.name}</a>
          </NameContainer>
          <LinkContainer>
            {hotel.url !== "" ? <a href={hotel.url}>🔗</a> : undefined}
          </LinkContainer>
        </Header>
        <Content>{hotel.description}</Content>
      </Container>
    </Card>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
`;

const Header = styled.div`
  display: flex;
`;

const NameContainer = styled.div`
  width: 100%;
  font-size: 16px;
  color: ${subColor};
  :link {
    text-decoration: none;
  }
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const LinkContainer = styled.div`
  :link {
    text-decoration: none;
  }
`;

const Content = styled.div`
  font-size: 12px;
  overflow: hidden;
  white-space: normal;
  text-overflow: ellipsis;
  /* 3行で省略 */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
`;

export default HotelCard;
