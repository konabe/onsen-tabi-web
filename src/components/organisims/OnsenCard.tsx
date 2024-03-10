import styled from "styled-components";

import { OnsenEntity } from "../../domain/models/onsen";
import {
  ChemicalTagModel,
  ChemicalTagOption,
} from "../../domain/models/onsen/chemicalTagModel";
import { subColor } from "../atoms/colors";
import Card from "../molecules/Card";
import ChemicalTag from "../molecules/onsen/ChemicalTag";

type Props = {
  onsen: OnsenEntity;
};

const OnsenCard: React.FC<Props> = ({ onsen }) => {
  return (
    <Card imgUrl={onsen.imgURL ?? "/img/onsen_default.png"}>
      <Container>
        <Header>
          <NameContainer>
            <a href={`/onsen/${onsen.id}`}>{onsen.name}</a>
          </NameContainer>
          <LinkContainer>
            {onsen.url !== "" ? <a href={onsen.url}>🔗</a> : undefined}
          </LinkContainer>
        </Header>
        <Sub>{onsen.getSubText()}</Sub>
        <Content>{onsen.description}</Content>
        <TagContainer>
          {onsen.getChemicalTags().map((v: ChemicalTagOption) => (
            <ChemicalTag
              key={v}
              chemical={new ChemicalTagModel(v)}
              isOmitted={true}
            />
          ))}
        </TagContainer>
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

const Sub = styled.div`
  font-size: 12px;
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

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`;

export default OnsenCard;
